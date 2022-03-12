/*
"results": {
  "1": {
    "comHandle": "71",
    "racHandle": "67",
    "rpts": "1",
    "rpos": "1",
    "rdisc": "0",
    "rcor": "0:20:34",
    "rrecpos": "1",
    "rrestyp": "2",
    "rele": "1234",
    "srat": "0",
    "rewin": "0:00:00",
    "rrwin": "0",
    "rrset": "0"
  },
}
*/

const raceTimeToSeconds = (text: string): number => {
  if (text.match(/[0-9]+/)) {
    return parseInt(text);
  }
  throw new Error(`Cannot parse race time from "${text}"`);
};
