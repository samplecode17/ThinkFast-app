<template>
    <div class="relative mt-2">
    <button
    type="button"
    @click="isOpen = !isOpen"
    class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-thinkfast sm:text-sm/6"
    aria-haspopup="listbox"
    :aria-expanded="isOpen"
    aria-labelledby="listbox-label"
    >
    <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
        <span class="block truncate">{{ selectedCategory?.name || 'Select a category' }}</span>
    </span>
    <svg class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
    </svg>
    </button>

    <ul
    v-if="isOpen"
    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
    role="listbox"
    aria-labelledby="listbox-label"
    >
    <li
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
        class="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-thinkfast hover:text-white"
        role="option"
    >
        <div class="flex items-center">
        <!-- Optional: image if you want to include it -->
        <!-- <img :src="category.imageUrl" alt="" class="size-5 shrink-0 rounded-full"> -->
        <span class="ml-3 block truncate font-normal">{{ category.name }}</span>
        </div>
        <span v-if="category.id === selectedCategory?.id" class="absolute inset-y-0 right-0 flex items-center pr-4 text-thinkfast">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
        </svg>
        </span>
    </li>
    </ul>
</div>
</template>
  
<script setup>
import { computed, ref, onBeforeMount} from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(async () => {
await store.dispatch('getCategories')
})

const emit = defineEmits(['select'])
// Reactive access to categories from the store
const categories = computed(() => store.getters.stateCategories)

// Local component state
const isOpen = ref(false)
const selectedCategory = ref(null) // Currently selected category object
// Handle category selection
function selectCategory(category) {
selectedCategory.value = category
isOpen.value = false
// emit id
emit('select', category)
}
</script>
  