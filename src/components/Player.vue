<template>
<div class="player-container">
    <div class="wrapper">

        <div class="cover">
            <input type="range" step="0.1" value="0" max="100" id="slider" class="timeline">
        </div>

        <div class="controls">
            <div class="time">
                <span>{{this.$store.state.currentDuration || "00:00"}}</span>
                <span>{{this.$store.state.bayaanDuration || "00:00"}}</span>
            </div>
            <div class="pause">
                <img src="../assets/icons/play.png" class="play-pause" v-if="$store.state.isPlaying == false" @click="this.$store.commit('unpause')" height="30" width="30">

                <img src="../assets/icons/pause.png" class="play-pause" v-if="$store.state.isPlaying == true" @click="this.$store.commit('pause')" height="30" width="30">

            </div>
            <div class="song">
                <div class="title">
                    <p>{{ this.$store.state.bayaanName }}</p>
                </div>
            </div>

            <div class="direction">
                <div class="btn-skip">
                    <img src="../assets/icons/download.png" width="20" height="20" @click="this.$store.commit('downloadBayaan', `${this.$store.state.bayaanNameComputed}`)"/>
                </div>

                <div class="btn-skip">
                    <img src="../assets/icons/replay10.png" @click="this.$store.commit('backward')" width="20" height="20" /> 
            </div>

            <div class="btn-skip">
                <img src="../assets/icons/forward10.png" @click="this.$store.commit('forward')" width="20" height="20" />
            </div>
</div>
    </div>
</div>

</div>
</template>

  <!-- The rest of the code remains the same -->

  <!-- The rest of the code remains the same -->

<script>
import {
    ref,
    onMounted
} from 'vue';
import {
    audio
} from '../store/index'
export default {

    setup() {

        const isMobile = ref(false);
        const sliderChangeFromPlayer = (inputValue) => {
            var slider = document.getElementById('slider');
            var time = (slider.value * audio.duration) / 100;
            audio.currentTime = time;
            console.log(audio.currentTime)
        };

        const updateLayout = () => {
            isMobile.value = window.innerWidth < 768;
        };

        onMounted(() => {
            updateLayout();
            window.addEventListener('resize', updateLayout);
            var slider = document.getElementById('slider');
            slider.addEventListener("input", sliderChangeFromPlayer)
        });

        return {
            isMobile
        };
    },

};
</script>

<style lang="scss" scoped>
// Define SCSS variables
$pink: #FF1493;
$grey-light: #ccc;
$grey: #999;
$grey-dark: #333;
$grey-med: #666;

.player-container {
    padding: 1rem;
    position: fixed;
    background-color: white;
    box-shadow: 0px 1px 0px 0px rgba(27, 31, 36, 0.04);
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0px;
}

.wrapper {
    position: relative;
}

// Cover section
.cover {
    top: 0;
    left: 0;
    z-index: 3;
}

// Timeline section
.timeline {
    position: absolute;
    bottom: -2px;
    left: 0;
    background: $pink;
    height: 5px;
    width: 100%;
    z-index: 4;
}

// Controls section
.controls {
    bottom: 0;
    left: 0;
    height: 36%;
    width: 100%;
    background: #fff;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;

    // Pause button
    .pause {
        height: 42px;
        width: 42px;
        float: left;
        margin-top: 34px;
        margin-left: 20px;
        padding-top: 12px;
        border-radius: 50%;
        background: $grey-dark;
        position: relative;
        transition: 0.3s;

        &:hover {
            background: $grey-med;
        }

    }

    .play-pause {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    // Song title and artist
    .song {
        float: left;
        margin: 30px 12px;

        .title {
            font-size: 1.3em;
            color: $grey-med;
        }

        .artist {
            font-size: 0.8em;
            color: $grey-light;
        }
    }

    // Time section
    .time {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 6px 10px;
        font-size: 0.65em;
        color: $grey;

        span:first-child {
            float: left;
        }

        span:last-child {
            float: right;
        }
    }

    // Direction section (forward, backward, shuffle)
    .direction {
        float: right;
        margin: 40px 18px;

        .btn-skip{
            background: #393E46;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            float: left;
            margin: 0 4px;
            font-size: 12px;
            color: #fff;
            transition: 0.3s;
            padding: 2.5px;
            &:hover {
                background: #0C7359;
            }

          

        }

    }
}

.title p {
    font-size: small;
}

/************* for the slider **************/
input[type="range"] {
    display: block;
    -webkit-appearance: none;
    appearance: none;
    background-color: #393E46;
    width: 100%;
    height: 5px;
    border-radius: 0px;
    margin: 0 auto;
    outline: 0;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: 2px solid white;
    background-color: #0C7359;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
    background-color: #D6AC6D;
    border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.3);
}


</style>
