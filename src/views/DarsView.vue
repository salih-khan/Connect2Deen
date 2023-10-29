<template>
<div class="container-fluid">
    <Header />
    <div class="container list-container">
        <div class="d-flex justify-content-center align-items-center h-100 search">
          <input
            v-model="searchQuery"
            class="form-control"
            type="text"
            @focus="onFocus"
            @blur="onBlur"
            placeholder="Search Bayaans"
          />
        </div>
  
        <div class="bayaan-list">
          <div class="bayaan-item" v-for="(bayan, index) in visibleBayaans" :key="index" @click="playBayaan(bayan.name)">
            <p class="bayaan-name">{{ bayan.name }}</p>
          </div>
        </div>
  
        <div class="pagination" v-if="showPagination"> <!-- Conditionally show pagination -->
          <button @click="previousPage">Previous</button>
          <span>Page {{ currentPage }}</span>
          <button @click="nextPage">Next</button>
        </div>
      </div>
    <div class="padding"></div>

    <Footer />
</div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import {
    onBeforeMount,
    onMounted,
    ref,
    computed,
    watch
} from 'vue';
import {
    useRoute
} from 'vue-router';
import {
    getStorage,
    listAll,
    ref as storageRef
} from 'firebase/storage';
import {
    auth,
    storage
} from "../firebase/config.js";

export default {
    components: {
        Header,
        Footer
    },
    setup() {
  const route = useRoute();
  const bayaans = ref([]);
  const currentPage = ref(1);
  const sortedBayaans = ref([]); // Create a new ref to store the sorted array
  const searchQuery = ref('');

  var firstParam = ref(route.params.Darse);
  var secondParam = ref(route.params.surah);
  const itemsPerPage = ref(1); // Set initial value based on screen width
  const filteredBayaans = ref([]);
  const filteredResults = ref([]);

watch([searchQuery, bayaans], () => {
        filteredBayaans.value = bayaans.value.filter((bayan) =>
            bayan.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );

        const filterResults = () => {
            filteredResults.value = bayaans.filter((result) =>
                result.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        }
    })
  const updateItemsPerPage = () => {
    itemsPerPage.value = window.innerWidth < 768 ? 12 : 20; // Adjust the threshold as needed
  };

  // Create a helper function to extract numeric values from a string
  function getNumericValue(name) {
    // Use a regular expression to find all sequences of digits in the name
    const matches = name.match(/\d+/g);

    // If there are matches, parse the first one as an integer; otherwise, return 0
    return matches ? parseInt(matches[0], 10) : 0;
  }

  const retrieveBayaans = async (category) => {
    // Initialize Firebase Storage
    const storage = getStorage();

    // Define the path to the category's folder
    const folderPath = `${category}/`;

    console.log(category);
    try {
      // Get the reference to the folder
      const folderRef = storageRef(storage, folderPath);

      // List all items (bayaans) in the folder
      const items = await listAll(folderRef);

      // Extract the names of bayaans and store them in the 'bayaans' ref
      bayaans.value = items.items.map((item) => {
        return {
          name: item.name,
          downloadURL: item.fullPath
        };
      });
    } catch (error) {
      console.error('Firebase Storage Error:', error);
    }
  };

  const displayedBayaans = ref([]);

  watch(bayaans, () => {
    sortedBayaans.value = bayaans.value.slice().sort((a, b) => {
      const numA = getNumericValue(a.name);
      const numB = getNumericValue(b.name);
      return numA - numB;
    });
  });

  watch([sortedBayaans, currentPage, itemsPerPage], () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    displayedBayaans.value = sortedBayaans.value.slice(startIndex, endIndex);
  });

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };

  const nextPage = () => {
    if (currentPage.value < Math.ceil(bayaans.value.length / itemsPerPage.value)) {
      currentPage.value += 1;
    }
  };
  const visibleBayaans = computed(() => {
      if (searchQuery.value) {
        // When searching, return the filtered bayaans
        return filteredBayaans.value;
      } else {
        // When not searching, return the current page of displayed bayaans
        return displayedBayaans.value;
      }
    });

                const showPagination = computed(() => {
      return !searchQuery.value; // Show pagination when not searching
    });

    const onFocus = () => {
      // Handle search input focus
    };

    const onBlur = () => {
      // Handle search input blur
      // Reset searchQuery or take any other appropriate action
    };
  watch(() => route.params.surah, async (newCategoryType) => {
    currentPage.value = 1;
    secondParam.value = route.params.surah;
    retrieveBayaans(`${firstParam.value}/${secondParam.value}`);
  });

  onBeforeMount(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
  });

  onMounted(() => {
    firstParam.value = route.params.Darse
    secondParam.value = route.params.surah;
    
    retrieveBayaans(`${firstParam.value}/${secondParam.value}`);
  });

  return {
    firstParam,
    secondParam,
    bayaans,
    displayedBayaans,
    currentPage,
    previousPage,
    nextPage,
    itemsPerPage,
    searchQuery,
                    filteredBayaans,
                    visibleBayaans,
                    showPagination,
                    onFocus,
                    onBlur
  };
},

            methods: {
                playBayaan(bayan) {
                    console.log(bayan)
                    var bayaanName = bayan
                    var slider = document.getElementById("slider")
                    slider.value = 0
                    this.$store.state.bayaanCategory = this.secondParam
                    this.$store.commit('play', `${bayaanName}`)
                }
            }
        };
</script>

<style scoped>
.padding {
    padding-bottom: 500px;
}

.bayaan-list {
    display: flex;
    flex-wrap: wrap;
    min-height: 700px;
    gap: 1rem;
    justify-content: space-evenly;
}

.bayaan-item {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    min-height: 125px;
    max-height: 200px;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
    cursor: pointer;
    width: 250px;
    text-align: center;
}

.bayaan-item:hover {
    background-color: #e0e0e0;
}

.bayaan-name {
    font-weight: bold;
    margin: 0;
}

.list-container {
    position: relative;
    /* Set the parent container to relative position */
}

.pagination {
    margin-top: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #fff;
}

.pagination button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.pagination button:hover {
    background-color: #258cd1;
}

.pagination span {
    font-size: 1.2rem;
    line-height: 2.5rem;
}

.search input {
  margin: 30px 0px;
  border-radius: 30px;
}
</style>
