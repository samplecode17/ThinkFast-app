<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-4xl px-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-25  w-auto" src="@/assets/ThinkLogo.svg" alt="ThinkFast" />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <!-- error alert -->
      <div
        v-if="errorMessage"
        class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <svg
          class="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Login failed!</span> {{ errorMessage }}
        </div>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="submit" class="space-y-9" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Username</label>
            <div class="mt-2">
              <input
                v-model="form.username"
                type="text"
                name="username"
                id="email"
                placeholder="Your username"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6',
                  errors.username ? 'border border-red-600' : ''
                ]"
                required
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                autocomplete="current-password"
                :class="[
                  'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6',
                  errors.password ? 'border border-red-600' : ''
                ]"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-thinkfast px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a href="/register" class="font-semibold text-thinkfast hover:text-gray-500">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

onBeforeMount(async () => {
  await store.dispatch('deactivateNavBar')
})

const form = reactive({
  username: '',
  password: ''
})

const errorMessage = ref('')
const errors = reactive({
  username: false,
  password: false
})

const submit = async () => {
  errorMessage.value = ''
  errors.username = false
  errors.password = false


  if (!form.username) errors.username = true
  if (!form.password) errors.password = true
  if (errors.username || errors.password) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  const User = new FormData()
  User.append('username', form.username)
  User.append('password', form.password)

  try {
    await store.dispatch('login', User);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Invalid username or password.';
    errors.username = true;
    errors.password = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
</script>
