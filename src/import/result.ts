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

export type Result = {
  importJson: Record<string, string> | null;
  resultId: string;
  seriesId: string;
  seriesCompetitorId: string;
  seriesRaceId: string;
  elapsedSeconds: number | null;
};

type ResultParseOptions = {
  seriesId: string;
};

type ResultJson = {
  racHandle: string;
  comHandle: string;
  rele?: string;
};

export const parseOneFromJson = (
  importJson: ResultJson,
  { seriesId }: ResultParseOptions
): Result => {
  const seriesRaceId = importJson.racHandle;
  const seriesCompetitorId = importJson.comHandle;
  const resultId = `${seriesId}|${seriesRaceId}|${seriesCompetitorId}`;

  const result = {
    resultId,
    importJson,
    seriesId,
    seriesCompetitorId,
    seriesRaceId,
    elapsedSeconds: importJson.rele ? raceTimeToSeconds(importJson.rele) : null,
  };
  return result;
};

export const parseFromJson = (
  importJson: Record<string, unknown>,
  options: ResultParseOptions
): Record<string, Result> => {
  const results: Record<string, Result> = {};
  Object.values(importJson).forEach((resultJson) => {
    const result = parseOneFromJson(<ResultJson>resultJson, options);
    results[result.resultId] = result;
  });

  return results;
};
