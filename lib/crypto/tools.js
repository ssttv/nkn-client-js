'use strict';

const Is = require('is')
const CryptoJS = require('crypto-js')
const Mathjs = require('mathjs')

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
}

function bytesToHex(bytes) {
  return Array.from(bytes, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2)
  }).join('');
}

module.exports.genPID = function (timestamp) {
  if (timestamp == undefined) {
    timestamp = new Date().getTime();
  }
  let nonce = Mathjs.random([32], 255);
  let pidWords = CryptoJS.SHA256(timestamp + bytesToHex(nonce));
  let pidHex = pidWords.toString(CryptoJS.enc.Hex);
  return hexToBytes(pidHex);
}
