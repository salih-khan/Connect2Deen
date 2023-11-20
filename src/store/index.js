import { createStore } from 'vuex'
import {
  useGregorianDate
} from '../composables/useGregorianDate.js'
import {
  getStorage,
  listAll,
  getDownloadURL,
  ref
} from 'firebase/storage';
import {
  auth,
  storage
} from "../firebase/config.js";
import {db} from '../firebase/config.js'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

export var audio = new Audio()

export default createStore({
  state: {


      isPlaying: false,
      bayaanName: '',
      bayaanNameComputed: ref(''),
      bayaanDuration: '',
      currentDuration: '',
      totalSeconds: '',

      //being defined from CategoryView
      bayaanCategory: ''
  },
  getters: {
  },
  mutations: {
    updateVariableBFromVariableA(state) {
      state.bayaanNameComputed = state.bayaanName || "dignity";
    },

   
    play: function (state, bayaan) {
      var slider = document.getElementById("slider")

      var {
        date,
        mm,
        year
    } = useGregorianDate()

      var tryAgain = false;

      function changeTimelinePosition() {
        const percentagePosition = 100 / audio.duration * audio.currentTime;
        slider.value = percentagePosition;
      }

      // Create a reference to the file we want to download
      const storage = getStorage();
    
      if(state.bayaanCategory.startsWith("Sūrah")){
        var bayaanRef = ref(storage, `Darse/${state.bayaanCategory}/${bayaan}`);

      }else{
        var bayaanRef = ref(storage, `${state.bayaanCategory}/${bayaan}`);

      }
    

      // Get the download URL
      getDownloadURL(bayaanRef)
      
     
        .then((url) => {
          // Insert url into an <img> tag to "download"
          audio.setAttribute('src', url)
          audio.load()
       audio.onloadedmetadata = function () {
    state.isPlaying = true;

    // ...
    state.bayaanName = bayaan;
    state.bayaanNameComputed = bayaan;
    if (state.bayaanName.length > 20) {
        state.bayaanName = state.bayaanName.substring(0, 20) + "...";
    }

    // Full time
    var totalNumberOfSeconds = Math.floor(audio.duration);
    const hours = Math.floor(totalNumberOfSeconds / 3600);
    const minutes = Math.floor((totalNumberOfSeconds % 3600) / 60);
    const seconds = Math.floor(totalNumberOfSeconds % 60);
    const result = (hours > 0 ? hours + ":" : "") +
                   (minutes >= 10 ? minutes : '0' + minutes) + ":" +
                   (seconds >= 10 ? seconds : '0' + seconds);
    state.bayaanDuration = result;
    state.totalSeconds = totalNumberOfSeconds;

    // Clear any previous update intervals
    if (state.updateInterval) {
        clearInterval(state.updateInterval);
    }

    // Update current duration
    state.updateInterval = setInterval(function () {
        var timerMin = Math.floor(audio.currentTime / 60);
        var timerSec = Math.floor(audio.currentTime % 60);
        state.currentDuration = `${timerMin >= 10 ? timerMin : '0' + timerMin}:${timerSec >= 10 ? timerSec : '0' + timerSec}`;
        audio.ontimeupdate = changeTimelinePosition;

    }, 1000);

    audio.play();
};
        

        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-erro

          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

              // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;

          }
        })


      //dealing with the data being sent to db
      //replace year with autmatic one
      const colRef = collection(db, year)
      const monthDocRef = doc(colRef, mm);


      getDocs(colRef)
      .then((snapshot) => {

        snapshot.docs.forEach((doc) => {

          if(doc.id == mm){
            updateDoc(monthDocRef, {
              clicked: doc.data().clicked + 1
            })
            .then(() => {
              return
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
          }
        })


        /////////////////////
      })
      .catch((error) => {
        console.error("Retrieving failed:", error);
      })


    },
    forward(state) {
      audio.currentTime += 10
    },
    backward(state) {
      audio.currentTime -= 10

    },
    pause(state) {
      
      audio.pause()
      state.isPlaying = false
    },
    unpause(state) {
      audio.play()
      state.isPlaying = true
    },
    downloadBayaan(state, bayaan) {
      var storage = getStorage();
      const storageRef = ref(storage);
var path = ""
      console.log("bayaan ", bayaan)

      if(state.bayaanCategory.startsWith("Sūrah")){
        bayaan = ref(`Darse/${state.bayaanCategory}/${bayaan}`);
        path = `${bayaan}`;

      }else{
        bayaan = ref(`${state.bayaanCategory}/${bayaan}`);
        path = `${bayaan}`;

      }
      const folderRef = ref(storageRef, path);

      getDownloadURL(folderRef)
        .then((url) => {
          // Insert url into an <img> tag to "download"


          //make this actual audio
          const audioUrl = url;

          window.open(audioUrl)

        })
        .catch((error) => {
          console.log(bayaan)
          console.log(folderRef)

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

              // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
            default:
          }
        });
    }

  },
  actions: {
  },
  modules: {
  }
})
