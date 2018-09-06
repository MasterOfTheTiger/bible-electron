/* Copyright 2018 MasterOfTheTiger and contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

*/

// Update this version number for every release:
const version = '0.3.0'
let timesChecked = localStorage.getItem('timesChecked');
let channel;

function checkUpdates() {
    console.log(document.getElementById('channel').value + ' is the channel.');
    if (document.getElementById('channel').value == 'beta') {
        channel = 'beta';
    } else {
        channel = 'latest';
    }
    console.log(timesChecked);
    url = 'https://heb12.github.io/updater/desktop/' + channel + '.json' + '?' + timesChecked;
    console.log(url);
    if (navigator.onLine) {
        console.log("Checking for updates...");
        timesChecked = Number(timesChecked) + 1;
        localStorage.setItem('timesChecked', timesChecked);
        fetch(url)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                if (result != '') {
                console.log(result);
                if (result.version != version) {
                    console.log('This version is outdated. The newest version is ' + result.newest);
                    document.getElementById('latestUpdate').innerHTML = 'Latest version: ' + result.version + ' (get the newest version from <span class="link">heb12.github.io/update</span>)';
                    document.getElementById('latestUpdate').style.display = 'block';
                } else {
                    console.log('Using latest version.');
                    document.getElementById('latestUpdate').innerHTML = 'Latest version: ' + result.version + ' (up to date)';
                    document.getElementById('latestUpdate').style.display = 'block';
                }
                } else {
                    // If for some reason the request returned as blank, it sends an error
                    console.log('Error requesting information for program version ' + version);
                }
            });
    } else {
        console.log('No internet connection!');
    }
    return result;
}
