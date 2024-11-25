<?php
$cssFiles = glob(__DIR__ . '/../public/build/css/*.css');
foreach ($cssFiles as $file) {
    $filename = basename($file);
    echo "<link rel='stylesheet' href='build/css/$filename'>\n";
}
?>
