<template>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet" />

    <div class="mx-4 min-h-screen max-w-screen-2xl sm:mx-8 xl:mx-auto">
        <h1 class="border-b border-gray-200 py-6 text-4xl font-semibold">Settings</h1>
        <div class="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <!-- Mobile menu -->
            <div class="relative my-4 w-56 sm:hidden">
                <input class="peer hidden" type="checkbox" id="select-1" />
                <label for="select-1"
                    class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">
                    Accounts
                </label>
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <ul
                    class="max-h-0 flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                    <li @click="selectedTab = 'accounts'" :class="tabClass('accounts')">
                        Accounts
                    </li>
                    <li @click="selectedTab = 'profile'" :class="tabClass('profile')">
                        Profile
                    </li>
                </ul>
            </div>

            <!-- Desktop menu -->
            <div class="col-span-2 hidden sm:block">
                <ul>
                    <li @click="selectedTab = 'accounts'" :class="tabClass('accounts')">
                        Accounts
                    </li>
                    <li @click="selectedTab = 'profile'" :class="tabClass('profile')">
                        Profile
                    </li>
                </ul>
            </div>

            <!-- Accounts tab -->
            <div v-if="selectedTab === 'accounts'"
                class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                <div class="pt-4">
                    <h1 class="py-2 text-2xl font-semibold">Account settings</h1>
                </div>

                <hr class="mt-4 mb-8 border-gray-300" />

                <!-- Email -->
                <p class="py-2 text-xl font-semibold">Email Address</p>
                <div v-if="!isEditingEmail" class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-gray-600">
                        Your email address is <strong>{{ user?.email }}</strong>
                    </p>
                    <button @click="startEditingEmail"
                        class="inline-flex text-sm font-semibold text-blue-600 underline">
                        Change
                    </button>
                </div>
                <div v-else class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <input v-model="editedEmail" type="email" id="email-input" name="email"
                        class="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Enter new email" />
                    <div class="flex gap-2">
                        <button class="text-sm text-white bg-blue-600 px-4 py-2 rounded-md"
                            @click="submitEmailChange">Save</button>
                        <button class="text-sm text-gray-600 underline" @click="isEditingEmail = false">Cancel</button>
                    </div>
                </div>

                <hr class="mt-4 mb-8 border-gray-300" />

                <!-- Password -->
                <form @submit.prevent="submitPasswordChange">
                    <p class="py-2 text-xl font-semibold">Password</p>
                    <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <label for="current-password">
                            <span class="text-sm text-gray-500">Current Password</span>
                            <input type="password" id="current-password" name="current-password"
                                v-model="currentPassword" class="w-full border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Current password" />
                        </label>
                        <label for="new-password">
                            <span class="text-sm text-gray-500">New Password</span>
                            <input type="password" id="new-password" name="new-password" v-model="newPassword"
                                class="w-full border border-gray-300 rounded-md px-4 py-2" placeholder="New password" />
                        </label>
                    </div>

                    <p class="mt-2 text-blue-600" v-if="successMsg">{{ successMsg }}</p>
                    <p class="mt-2 text-red-500" v-if="errorMsg">{{ errorMsg }}</p>

                    <button @click="submitPasswordChange" class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
                        Save Password
                    </button>
                </form>


                <hr class="mt-4 mb-8 border-gray-300" />

                <!-- Delete -->
                <div class="mb-10">
                    <p class="py-2 text-xl font-semibold">Delete Account</p>
                    <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        Proceed with caution
                    </p>
                    <p class="mt-2">
                        Make sure you have taken backup of your account... There is no way to access your account after
                        this action.
                    </p>
                    <button @click="submitAccountDelete"
                        class="ml-auto mt-2 text-sm font-semibold text-rose-600 underline decoration-2">
                        Continue with deletion
                    </button>
                </div>
            </div>

            <!-- Profile tab -->
            <div v-if="selectedTab === 'profile'"
                class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                <div class="pt-4 mx-auto">
                    <h1 class="py-2 text-2xl font-semibold">Profile settings</h1>
                </div>
                <hr class="mt-4 mb-8 border-gray-300" />
                <div class="py-4 mx-auto md:mx-10">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:gap-8 gap-6">

                        <div
                            class="pl-10 justify-start items-start mx-auto w-full flex flex-col sm:items-start gap-4 sm:flex-row">
                            <img :src="uploadedImageLink || profileInfo.profile_image || defaultImage"
                                class="w-40 h-40 rounded-full object-cover ring-2 ring-blue-300 dark:ring-blue-500"
                                alt="Profile avatar" />

                            <input ref="fileInput" type="file" class="hidden" @change="handleImageUpload"
                                accept="image/*" />

                            <div class="flex flex-col gap-3 mt-4 sm:mt-0">
                                <button type="button" @click="triggerFileSelect"
                                    class="py-2.5 px-6 text-sm font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800">
                                    Change picture
                                </button>
                                <button type="button" @click="deleteProfileImage"
                                    class="py-2.5 px-6 text-sm font-semibold text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-100">
                                    Delete picture
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="py-4 mx-auto md:mx-10">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:gap-8 gap-6">
                        <div class="flex-1 w1/2 px-5 md:px-10">
                            <label for="username" class="block">
                                <span class="text-sm text-gray-600">Username</span>
                                <input type="text" id="username" name="username" v-model="profileInfo.username"
                                    class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                    placeholder="Your username" />
                            </label>
                        </div>
                        <div class="flex-1 w1/2 px-5 md:px-10">
                            <label for="first-name" class="block">
                                <span class="text-sm text-gray-600">First name</span>
                                <input type="text" id="first-name" name="first-name" v-model="profileInfo.first_name"
                                    class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                    placeholder="Your first name" />
                            </label>
                        </div>
                    </div>

                </div>
                <div class="py-4 mx-auto md:mx-10">
                    <div class="flex flex-col sm:flex-row sm:items-start sm:gap-8 gap-6">
                        <div class="flex-1 w1/2 px-5 md:px-10">
                            <label for="second-name" class="block">
                                <span class="text-sm text-gray-600">Second name</span>
                                <input type="text" id="second-name" name="second-name" v-model="profileInfo.second_name"
                                    class="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                    placeholder="Your second name" />
                            </label>
                        </div>
                        <div class="flex-1 w1/2 px-5 md:px-10"></div>
                    </div>

                </div>
                <div class="py-4 mx-auto">
                    <div class="mx-auto flex justify-end sm:gap-8 gap-6">
                        <div v-if="profileSuccessMsg" class="mr-4 text-green-600 self-center">
                            {{ profileSuccessMsg }}
                        </div>
                        <button @click="submitProfile"
                            class="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'


const store = useStore()
const user = computed(() => store.getters.stateUser)

const selectedTab = ref('accounts')
const isEditingEmail = ref(false)
const editedEmail = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const profileSuccessMsg = ref('')

function tabClass(tab) {
    return [
        'mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition',
        selectedTab.value === tab
            ? 'border-l-blue-700 text-blue-700'
            : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'
    ]
}

function startEditingEmail() {
    isEditingEmail.value = true
    editedEmail.value = user.value?.email || ''
}

async function submitEmailChange() {
    try {
        const userId = user.value?.id
        await store.dispatch('editUser', { userId, form: { email: editedEmail.value } })
        isEditingEmail.value = false
    } catch {
        isEditingEmail.value = false
    }
}

async function submitPasswordChange() {
    errorMsg.value = ''
    successMsg.value = ''

    const data = await store.dispatch('validatePassword', currentPassword.value)
    if (!data?.ok) {
        errorMsg.value = 'Incorrect current password.'
        return
    }

    try {
        await store.dispatch('editUser', {
            userId: user.value?.id,
            form: { password: newPassword.value }
        })

        successMsg.value = 'Password updated successfully!'
        currentPassword.value = ''
        newPassword.value = ''

    } catch (error) {
        errorMsg.value = 'An error occurred while updating the password.'
        console.error(error)
    }
}

async function submitAccountDelete() {
    await store.dispatch('deleteUser', user.value?.id)
}

const profileInfo = reactive({
    profile_image: user.value?.profile_image,
    username: user.value?.username,
    first_name: user.value?.first_name,
    second_name: user.value?.second_name,
})

async function submitProfile() {
    try {
        const uploadedImage = store.getters['imagepost/uploadedImageUrl']
        if (uploadedImage) {
            profileInfo.profile_image = uploadedImage
        }
        const edited_profile = { ...profileInfo }
        await store.dispatch('editUser', { userId: user.value?.id, form: edited_profile })

        
        profileSuccessMsg.value = 'Profile saved successfully!'

        setTimeout(() => {
            profileSuccessMsg.value = ''
        }, 3000)
    } catch (error) {
        console.error('Error saving profile:', error)
    }
}

const fileInput = ref(null)
const defaultImage = "https://via.placeholder.com/150"

function triggerFileSelect() {
    fileInput.value?.click()
}

function handleImageUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    store.dispatch('imagepost/uploadImage', file)
}

function deleteProfileImage() {
    profileInfo.profile_image = user.value?.profile_image
    store.dispatch('imagepost/deleteImagePreview')
}

const uploadedImageLink = computed(() => store.getters['imagepost/uploadedImageUrl'])

</script>