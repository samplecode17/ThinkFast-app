<template>
    <!-- Error Alert -->
    <div v-if="errorMessage"
        class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert">
        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Error</span>
        <div>
            <span class="font-medium">Error:</span> {{ errorMessage }}
        </div>
    </div>

    <!-- Botón que abre el modal -->
    <button @click="showModal = true"
        class="block text-white bg-thinkfast hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Create difficulty
    </button>

    <!-- Modal controlado por Vue -->
    <div v-if="showModal"
        class="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-gray-800/[var(--bg-opacity)] [--bg-opacity:50%]">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Contenido del modal -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Cabecera del modal -->
                <div
                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Create new Difficulty
                    </h3>
                    <button type="button" @click="showModal = false"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <!-- Cuerpo del modal -->
                <form @submit.prevent="submitDifficulty" class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input v-model="form.name" type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type difficulty name" required />
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-thinkfast hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Add new difficulty
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';

const store = useStore();
const showModal = ref(false);
const errorMessage = ref('');

const form = reactive({
    name: '',
});

const submitDifficulty = async () => {
    try {
        errorMessage.value = '';
        await store.dispatch('createDifficulty', { ...form });
        showModal.value = false;
        form.name = '';
    } catch (e) {
        errorMessage.value = e.message || 'An unexpected error occurred';
    }
};
</script>