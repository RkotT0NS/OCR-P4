<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Upload Storage Disk
    |--------------------------------------------------------------------------
    |
    | This option determines the default storage disk that will be utilized
    | to persist uploaded files. You may specify any of your configured
    | disks from the filesystems configuration file.
    |
    */

    'disk' => env('UPLOAD_DISK', 'public'),

    /*
    |--------------------------------------------------------------------------
    | Upload Storage Path
    |--------------------------------------------------------------------------
    |
    | This option specifies the directory within the configured disk where
    | uploaded files should be stored.
    |
    */

    'path' => env('UPLOAD_PATH', 'uploads'),

    /*
    |--------------------------------------------------------------------------
    | Upload Hashing Algorithm
    |--------------------------------------------------------------------------
    |
    | This option specifies the hashing algorithm used to generate unique
    | filenames for the uploaded files to avoid collisions and provide
    | a degree of obfuscation.
    |
    */

    'hashing_algorithm' => env('UPLOAD_HASH_ALGO', 'sha512'),

];
