<template>
<div class="container-fluid header">
    <img id="logo" src="../assets/icons/logo.png" width="50" height="50">
        

    <div class="container button-container">

        <div class="row">
            <!-- Second row (smaller) -->
            <div class="col">
                <!-- Navigation links or content for the second row -->
                <div class="scrollable-navbar">
                    <PerfectScrollbar>

                        <router-link id="home-nav" class="btn" to="/">Home</router-link>

                        <router-link class="btn button nav-link " to="/category/Pearls">Pearls of Wisdom</router-link>
                        <router-link class="btn button nav-link " to="/category/Sisters’ Programmes">Sisters’ Programmes</router-link>
                        <router-link class="btn button nav-link " to="/category/Jumuʿah Lectures">Jumuʿah Lectures</router-link>
                        <router-link class="btn button nav-link " to="/category/Short and Sweet">Short and Sweet</router-link>
                        <router-link class="btn button nav-link " to="/category/A Commentary on Imām al-Būṣīrī’s Qaṣīdah Burdah">A Commentary on Imām al-Būṣīrī’s Qaṣīdah Burdah</router-link>
                        <router-link class="btn button nav-link " to="/category/Ramadān Lectures">Ramadān Lectures</router-link>

                    </PerfectScrollbar>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Third row (smaller) -->
            <div class="col">
                <!-- Navigation links or content for the third row -->
                <div class="scrollable-navbar">
                    <PerfectScrollbar>

                        <router-link class="btn button nav-link" to="/Darse/Sūrah Luqmān">Sūrah Luqmān</router-link>

                        <router-link class="btn button nav-link" to="/Darse/Sūrah Maryam">Sūrah Maryam</router-link>

                        <router-link class="btn button nav-link" to="/Darse/Sūrah Tā-Hā">Sūrah Tā-Hā</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah Yūsuf">Sūrah Yūsuf</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah ad-Dukhān">Sūrah ad-Dukhān</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Anfāl">Sūrah al-Anfāl</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Anʿām">Sūrah al-Anʿām</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-A’rāf">Sūrah al-A’rāf</router-link>

                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Kahf">Sūrah al-Kahf</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Mulk">Sūrah al-Mulk</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Mu’minūn">Sūrah al-Mu’minūn</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Mā’idah">Sūrah al-Mā’idah</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah al-Wāqiʿah">Sūrah al-Wāqiʿah</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah ar-Rahmān">Sūrah ar-Rahmān</router-link>
                        <router-link class="btn button nav-link " to="/Darse/Sūrah as-Sajdah">Sūrah as-Sajdah</router-link>
                    </PerfectScrollbar>

                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    PerfectScrollbar
} from 'vue3-perfect-scrollbar';
import {
    onMounted,
    onBeforeUnmount,
    ref
} from 'vue';

export default {
    components: {
        PerfectScrollbar
    },
    setup() {
        var isPhone = ref(3); // Default value is set to 3

        const updateIsPhone = () => {
            isPhone.value = window.innerWidth < 768 ? 2 : 7; // You can adjust the threshold as needed
        };

        onMounted(() => {
            window.addEventListener('resize', updateIsPhone);
            // Initial check on mount
            updateIsPhone();
        })

        onBeforeUnmount(() => {
            // Remove the event listener on component unmount
            window.removeEventListener('resize', updateIsPhone);
        });

        return {
            isPhone,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#home-nav {
    margin-left: 10px;
    margin-right: 10px;
    color: #F7F7F7;
    padding: 10px 10px;
}

#logo {
    margin: 10px;
}

.header {
    background-image: url('../assets/images/Design 8.png');
    padding: 0px;
    background-repeat: no-repeat;
    background-position: center;
}

.header .col {
    margin: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.header .col .button {
    background: rgba(255, 255, 255, 0.75);
    color: #333;
}

#home-nav {
    background-color: #6D9886;
    color: #F7F7F7;
}

#logo {
    margin-top: 10px;
    margin-left: 20px;
    background-color: #071418;
}

.header {
    background-color: #071418;
}

.scrollable-navbar {
    overflow-x: hidden;
    white-space: nowrap;

}

.nav-link {
    display: inline-block;
    margin-left: 10px;

    margin-right: 10px;
    user-select: none;
    /* Make links unselectable */
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    padding: 10px 10px;
}

</style>
