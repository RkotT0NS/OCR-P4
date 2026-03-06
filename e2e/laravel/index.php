<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';


// ONLY run this if we detect a specific Playwright header/cookie and we are in a local/testing environment
// TODO: handle this in a dedicated test environment
if (isset($_COOKIE['E2E_COVERAGE']) && env('APP_ENV') !== 'production') {

    $filter = new \SebastianBergmann\CodeCoverage\Filter;
    $fileIterator = new SebastianBergmann\FileIterator\Facade;

    // Tell it to only track coverage inside the app/ directory
    $filter->includeFiles($fileIterator->getFilesAsArray(__DIR__ . '/../app'));

    $driver = (new \SebastianBergmann\CodeCoverage\Driver\Selector)->forLineCoverage($filter);
    $coverage = new \SebastianBergmann\CodeCoverage\CodeCoverage($driver, $filter);

    // Start tracking the code execution
    $coverage->start($_SERVER['REQUEST_URI']);

    // When PHP finishes the request, save the coverage data to a file
    register_shutdown_function(function () use ($coverage) {
        $coverage->stop();

        $coverageDir = __DIR__ . '/../storage/coverage-e2e';
        if (!is_dir($coverageDir)) {
            mkdir($coverageDir, 0777, true);
        }

        $writer = new \SebastianBergmann\CodeCoverage\Report\PHP();
        // Save as a unique .cov file for this specific HTTP request
        $writer->process($coverage, $coverageDir . '/' . uniqid('req_', true) . '.cov');
    });
}


// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
