const fs = require('fs');

// Delete the report even when it can't be parsed: a crashed attw leaves an empty
// .attw.json, and a leftover file blocks the next checkout of the SDK repo.
function readReport() {
  try {
    return JSON.parse(fs.readFileSync('.attw.json', 'utf-8'));
  } catch (error) {
    throw new Error(`attw did not write a JSON report, so it probably crashed: ${error.message}`, {
      cause: error,
    });
  } finally {
    fs.rmSync('.attw.json', { force: true });
  }
}

const problems = Object.values(readReport().problems)
  .flat()
  .filter(
    (problem) =>
      !(
        // This is intentional, if the user specifies .mjs they get ESM.
        (
          (problem.kind === 'CJSResolvesToESM' && problem.entrypoint.endsWith('.mjs')) ||
          // This is intentional for backwards compat reasons.
          (problem.kind === 'MissingExportEquals' && problem.implementationFileName.endsWith('/index.js')) ||
          // this is intentional, we deliberately attempt to import types that may not exist from parent node_modules
          // folders to better support various runtimes without triggering automatic type acquisition.
          (problem.kind === 'InternalResolutionError' && problem.moduleSpecifier.includes('node_modules'))
        )
      ),
  );
if (problems.length) {
  process.stdout.write('The types are wrong!\n' + JSON.stringify(problems, null, 2) + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write('Types ok!\n');
}
