import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { globSync } from 'glob';

interface Options {
  /** Игнорировать записи, которые соответствуют переданным регулярным выражениям */
  exclude?: Array<string | RegExp>;
}

/**
 * Генерирует input/entry для сборки из поля "exports" в package.json.
 * Предполагается, что исходный код размещен в директории `src`, а собранный в `dist`.
 *
 * @param configURL - Передать import.meta.url из файла конфига
 * @param options - Опции
 *
 * @throws {Error} Если поле "exports" отсутствует в package.json
 *
 * @example
 * // vite.config.ts / rollup.config.ts
 *
 * const entry = getEntryFromPackage(import.meta.url);
 */
export function getEntryFromPackage(
  configURL: string,
  options: Options = { exclude: [] },
): Record<string, string> {
  const dirname = path.dirname(fileURLToPath(configURL));
  const entry: Record<string, string> = {};

  const contents = readFileSync(path.resolve(dirname, 'package.json'), {
    encoding: 'utf-8',
  });

  const pkg: {
    exports?: Record<string, { types?: string; default?: string } | string>;
  } = JSON.parse(contents);

  if (pkg.exports == null) {
    throw new Error('Missing "exports" field in the package.json');
  }

  Object.entries(pkg.exports).forEach(([exportName, value]) => {
    if (
      options.exclude?.some((exclude) => {
        if (typeof exclude === 'string') {
          return exportName === exclude;
        }

        return exclude.test(exportName);
      })
    ) {
      return;
    }

    if (typeof value === 'object') {
      // Создаем entry по типам d.ts
      if (value.types != null) {
        // Если путь указан как: ./dist/store/*.d.ts, то читаем entry через glob
        if (value.types.includes('*')) {
          readFilesByGlob(path.resolve(dirname, value.types)).forEach(
            ([name, path]) => {
              entry[name] = path;
            },
          );

          // ./dist/store/index.d.ts -> (store/index, ./src/store/index.ts)
        } else {
          const name = getEntryNameFromDts(value.types);
          entry[name] = resolveEntryByName(name);
        }

        return;
      }
    } else {
      // NOTE: wildcard and string entries support is not implemented
    }

    console.warn(`Entry "${exportName}" not supported, specify it manually!`);
  });

  return entry;

  function readFilesByGlob(glob: string): Array<[string, string]> {
    const files = globSync(glob);

    return files.map((file) => {
      const relative = path.relative(dirname, file);
      const name = getEntryNameFromDts(relative);

      return [name, resolveEntryByName(name)];
    });
  }

  function resolveEntryByName(name: string): string {
    return path.resolve(dirname, 'src', `${name}.ts`);
  }
}

function getEntryNameFromDts(file: string): string {
  return file.replaceAll(/(^(\.\/)?dist\/|.d.ts$)/g, '');
}
