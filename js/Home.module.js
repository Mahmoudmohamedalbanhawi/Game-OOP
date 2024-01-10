import { Details } from "./Details.module.js";
import { UI } from "./UI.module.js"

export class Home{
    constructor(){
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click',()=>{
               
                this.changelink(link)
                const category = link.dataset.category;
                this.getGames(category);
            })
        })
        this.loading = document.querySelector('.loading')
        this.ui = new UI()
        this.getGames(`MMORPG`)
        this.details = document.getElementById('details')
        this.games = document.getElementById('games')
    };
    async changelink(link){
       
        document.querySelector('.active').classList.remove('active')
          link.classList.add('active')
        
       
    }
        async getGames(id){
            this.loading.classList.remove('d-none')
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '0e1bca4aa7msh1822411fd0cd538p13e761jsn395558118908',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${id}`,options)
            const response = await api.json()
            this.loading.classList.add('d-none')
            console.log(response)
            this.ui.displayGames(response)
            document.querySelectorAll(".card").forEach(item=>{
                item.addEventListener("click",()=>{
                  this.details.classList.remove('d-none')
                  this.games.classList.add('d-none')
                  const details = new Details(item.dataset.id)
                })
            })
          
        }
     
}