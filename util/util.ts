import { Match, TeamNameMap, Team, MatchRecord } from "../models.ts";

export function cartesianProduct<Type>(a: Type[], b: Type[]) {
	return a.flatMap((x) => b.map((y) => [x, y]));
}

export function printRound(matches: Match[], teamNameMap?: TeamNameMap[]) {
	if (teamNameMap) {
		for (const match of matches) {
			console.log(
				`${teamNameMap[match.matchRecord!.upperTeam - 1].name} vs ${
					teamNameMap[match.matchRecord!.lowerTeam - 1].name
				}`
			);
		}
	} else {
		for (const match of matches) {
			console.log(`${match.matchRecord?.upperTeam} vs ${match.matchRecord?.lowerTeam}`);
		}
	}
}

export function isFilledRound(matches: Match[]): boolean {
	for (let index = 0; index < matches.length; index++) {
		const matchRecord = matches[index].matchRecord;
		if (matchRecord) {
			const isFilledOut = matchRecord.upperTeamWins - matchRecord.lowerTeamWins !== 0;
			if (!isFilledOut) {
				return false;
			}
		}
	}
	return true;
}

export function getWinners(matches: Match[]) {
	const result: Team[] = [];

	for (let index = 0; index < matches.length; index++) {
		const match = matches[index];
		if (match.matchRecord) {
			const mr = match.matchRecord;
			if (mr.upperTeamWins > mr.lowerTeamWins) {
				result.push(mr.upperTeam);
			} else if (mr.lowerTeamWins > mr.upperTeamWins) {
				result.push(mr.lowerTeam);
			}
		}
	}

	return result;
}

export function getLosers(matches: Match[]) {
	const result: Team[] = [];

	for (let index = 0; index < matches.length; index++) {
		const match = matches[index];
		if (match.matchRecord) {
			const mr = match.matchRecord;
			if (mr.upperTeamWins < mr.lowerTeamWins) {
				result.push(mr.upperTeam);
			} else if (mr.lowerTeamWins < mr.upperTeamWins) {
				result.push(mr.lowerTeam);
			}
		}
	}

	return result;
}

export function populateMatches(matches: Match[], teams: Team[][]) {
	if (teams.length !== matches.length) {
		throw new Error(
			`There must twice as many teams as matches. matches.length=${matches.length}, teams.length=${teams.length}`
		);
	}

	for (let index = 0; index < teams.length; index++) {
		const matchup = teams[index];
		const team1 = matchup[0];
		const team2 = matchup[1];
		const record = new MatchRecord(team1, team2);
		matches[index].matchRecord = record;
	}
}
