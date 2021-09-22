const axios = require('axios')
const standings = axios.create({
	baseURL: "https://api-football-standings.azharimm.site/leagues",
});

class Controller{
	static async getStandings(req, res, next){
		try{
			const leagueName = req.params.name

			let leagueCode;

			switch (leagueName){
				case "english":
				leagueCode = "eng.1"
				break

				case "indonesia":
				leagueCode = "idn.1"
				break

				case "france":
				leagueCode = "fra.1"
				break

				case "germany":
				leagueCode = "ger.1"
				break

				case "italy":
				leagueCode = "ita.1"
				break

				case "spain":
				leagueCode = "eps.1"
				break


				default:
				throw({name : "not listed league"})
				break
			}

			const {data} = await standings.get(`/${leagueCode}/standings?season=2021&sort=asc`)
			if (data) {
				res.status(200).json({
					league : data.data.name,
					season : data.data.season,
					'top-one' : data.data.standings[0].team
				}) 
			}

		}
		catch(err){
			console.log(err);
			next(err)
		}
	}
}

module.exports = Controller