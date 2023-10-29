import {ref} from 'vue'
import {computed} from 'vue'

export  function useArabDate(){

    const hijri = require('hijri-js');

    const x = hijri.initialize();

    var iD = ref('')
    var iM = ref('')
    var iY = ref('')

    iD = computed(() => {
        return x.today().day;
    })

    iM = computed(() => {
        return x.today().monthName;
    })

    iY = computed(() => {
        return x.today().year;
    })

    return {iD, iM, iY};
}