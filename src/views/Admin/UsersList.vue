<template>
    <div class="flex justify-end p-4">
        <button @click="handleCreate"
            class=" text-white bg-thinkfast hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create
        </button>
    </div>
    <div class="w-full mx-auto p-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Role</th>
                    <th scope="col" class="px-6 py-3">First name</th>
                    <th scope="col" class="px-6 py-3">Second name</th>
                    <th scope="col" class="px-6 py-3">Followers</th>
                    <th scope="col" class="px-6 py-3">Edit</th>
                    <th scope="col" class="px-6 py-3">Delete</th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="user in users"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row"
                        class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img class="w-10 h-10 rounded-full" :src="user?.profile_image" alt="Jese image">
                        <div class="ps-3">
                            <div class="text-base font-semibold">{{ user?.username }}</div>
                            <div class="font-normal text-gray-500">{{ user?.email }}</div>
                        </div>
                    </th>
                    <td class="px-6 py-4">
                        {{ user?.role }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user?.first_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user?.second_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user?.followers_count }}
                    </td>
                    <td class="px-6 py-4">
                        <!-- Modal toggle -->
                        <a href="#" type="button" data-modal-show="editUserModal"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                    </td>
                    <td class="px-6 py-4">
                        <!-- Modal toggle -->
                        <a href="#" type="button" data-modal-show="editUserModal"
                            class="font-medium text-red-600 dark:text-blue-500 hover:underline">Remove user</a>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';


const store = useStore()

onBeforeMount(async () => {
    await store.dispatch('getAllUsers')
})

const users = computed(() => store.getters.getAllUsers)

</script>