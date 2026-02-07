
const { readFileSync } = require('fs');

const V8CoverageReport = JSON.parse(readFileSync('./v8-coverage/report.json'));
const v8toIstanbul = require('v8-to-istanbul');
const libCoverage = require('istanbul-lib-coverage');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');
const path = require('path');

async function processCoverage(playwrightV8Results) {
  const map = libCoverage.createCoverageMap();

  for (const entry of playwrightV8Results) {
    const entryUrl = new URL(entry.url);
    if (entryUrl.pathname.startsWith('/resources/js/')) {
      console.log({
        path: entryUrl.pathname,
        source: entry.url,
        pattern: `${process.cwd()}/../laravel/${entryUrl.pathname}`,
        resolved: path.resolve(`${process.cwd()}/../laravel/${entryUrl.pathname}`)
      });

      // console.log(entry.sourcePath)
      // 1. Initialize the converter for a specqific file
      // Point it to the local source file path
      const converter = v8toIstanbul(path.resolve(`${process.cwd()}/../laravel/${entryUrl.pathname}`), 0, { source: entry.source });

      await converter.load();

      // 2. Apply the V8 ranges to the converter
      converter.applyCoverage(entry.functions);

      // 3. Merge into a global Istanbul map
      map.merge(converter.toIstanbul());
    }
  }

  // 4. Generate the HTML report
  const context = libReport.createContext({
    dir: './coverage-report',
    defaultSummarizer: 'nested',
    coverageMap: map,
  });

  reports.create('html').execute(context);
}
processCoverage(V8CoverageReport);
