// ==UserScript==
// @name         YouTube Aspect Ratio Switcher
// @version      1.3
// @description  Adds an aspect ratio switcher button to YouTube's video player.
// @namespace    CHJ85
// @author       CHJ85
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var currentRatio = null;
    var aspectRatios = ["↔", "4:3", "16:9", "9:16", "3:2", "21:9"];
    var aspectRatiosIndex = 0;
    var videoElemAttr = "data-aspectRatio-userscript";
    var buttonhtml = `<button id="aspectratioSwitcher" class="ytp-button" title="Aspect Ratio">↔</button>`;
    var csshtml = `
        <style>
        #aspectratioSwitcher {
            top: -13px;
            position: relative;
            text-align: center;
            font-size: 25px;
        }
        .ytp-big-mode #aspectratioSwitcher {
            font-size: 182%;
            top: -19px;
        }

        #movie_player[data-aspectRatio-userscript="16:9"] #aspectratioSwitcher,
        #movie_player[data-aspectRatio-userscript="9:16"] #aspectratioSwitcher,
        #movie_player[data-aspectRatio-userscript="4:3"] #aspectratioSwitcher,
        #movie_player[data-aspectRatio-userscript="3:2"] #aspectratioSwitcher,
        #movie_player[data-aspectRatio-userscript="21:9"] #aspectratioSwitcher {
            font-size: unset;
        }

        .html5-main-video { transition: .2s; }

        #movie_player[data-aspectRatio-userscript="16:9"] .html5-main-video { transform: scale(1.335,1)!important; }
        #movie_player[data-aspectRatio-userscript="4:3"] .html5-main-video { transform: scale(.75,1)!important; }
        #movie_player[data-aspectRatio-userscript="9:16"] .html5-main-video { transform: scale(1.77,1)!important; }
        #movie_player[data-aspectRatio-userscript="3:2"] .html5-main-video { transform: scale(1.5,1)!important; }
        #movie_player[data-aspectRatio-userscript="21:9"] .html5-main-video { transform: scale(1.19,1)!important; }
        </style>
    `;

    var anchorElem = document.querySelector(".ytp-button.ytp-settings-button, .ytp-subtitles-button.ytp-button");
    anchorElem.insertAdjacentHTML("beforebegin", buttonhtml + csshtml);

    var buttonElem = document.querySelector("#aspectratioSwitcher");
    buttonElem.addEventListener("click", aspectRatioSwitch);

    function aspectRatioSwitch() {
        var videoElem = document.querySelector("#movie_player");

        aspectRatiosIndex = (aspectRatiosIndex + 1) % aspectRatios.length;
        currentRatio = aspectRatios[aspectRatiosIndex];
        videoElem.setAttribute(videoElemAttr, currentRatio);
        buttonElem.innerHTML = currentRatio;
    }
})();
