<?php
$jsFiles = glob(__DIR__ . '/../public/build/js/*.js');
foreach ($jsFiles as $file) {
    $filename = basename($file);
    echo "<script src='build/js/$filename'></script>\n";
}
?>
