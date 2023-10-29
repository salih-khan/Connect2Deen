<template>
    <div class="container info-home">
        <h3>Today's Pick</h3>
        <p id="date">{{this.date}} / {{this.mm}} / {{this.year}}&emsp;{{this.iD}} / {{this.iM}} / {{this.iY}}</p>

        <div class="announcements">
            <h4 style="padding: 5px; display: block;">Announcements</h4>
            <ul>
                <li>
                    <p>New and improved design and features</p>
                </li>
                <li>
                    <p>Search for a topic in their respective category</p>
                </li>
                <li>
                    <p>All bayanaats are downloadable!</p>
                </li>
                <li>
                    <p>Darse of Surah Al Mu'min is currently taking place</p>
                </li>
      

            </ul>
            <br />

            <i class="fab fa-instagram" style="font-size: 40px; margin: 10px; margin-left: 20px;" @click="newTab('https://instagram.com/connect2deen2023?igshid=OGQ5ZDc2ODk2Za==')"></i>
            <i class="fab fa-tiktok" style="font-size: 40px; margin: 10px; margin-left: 20px;" @click="newTab('https://www.tiktok.com/@connect2deen')"></i>
            <i class="fab fa-facebook-f" style="font-size: 40px; margin: 10px; margin-left: 20px;" @click="newTab('https://www.facebook.com/profile.php?id=61552836236172')"></i>
            <a href="mailto:connect2deen@outlook.com" class="btn btn-primary" id="contact">contact us</a>

        </div>
    
        <div class="container bg-light info">
            <br/>
            <p>Mawlana Sajid Irshad completed his Alimiyyah course from Al Jamiatul Islamiyah Darul Uloom Bolton in 2005</p>
            <p>Since graduation he has been delivering lectures around various topics in both English and Urdu on spirituality, commentry of the Quran Shareef and contemporary issues dealing with the society</p>
            <p>The talks are easy to understand and thought provoking which encourage the listener to remain attentive and empower one to connect to the deen </p>
            <p>Currently he is an Imam at Masjid Farooqe Azam Burnley, a teacher of Islamic studies at Rawdhatul Uloom school and a senior lecturer of hadeeth at Al Barakah Academy</p>
        <br/>
        </div>

        <br/>
        <br/>

        
    </div>
</template>

<script>
import {
    useGregorianDate
} from '../composables/useGregorianDate.js'
import {
    useArabDate
} from '../composables/useArabDate'

export default{
    methods:{
        newTab(url){
            window.open(url, "_blank");

        },
    },
    setup(){
      var {
            date,
            mm,
            year
        } = useGregorianDate()
        var {
            iD,
            iM,
            iY
        } = useArabDate()

        return{
          date,
            mm,
            year,
            iD,
            iM,
            iY,
        }
    }
}
</script>

<style scoped>
.info-home{
    margin-top: 20px;
    min-height: 100vh;
}
.announcements{
    border-left:5px solid #6D9886; 
    border-radius: 5px; 
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  .announcements ul li p{
    color: #333;
  
  }
  .announcements ul{
    list-style-type:circle;
  }
  .fab:hover{
    cursor: pointer;
  }
  #contact{
    margin-bottom: 15px;
  }
  .info{
    margin-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
</style>