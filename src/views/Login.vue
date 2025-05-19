<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-4xl px-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-25  w-auto" src="@/assets/ThinkLogo.svg" alt="ThinkFast">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
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
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-[#11c3f5] hover:text-gray-500">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-[#11c3f5] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a href="#" class="font-semibold text-[#11c3f5] hover:text-gray-500">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const form = reactive({
username: '',
password: ''
})

const router = useRouter()
const store = useStore()

const submit = async () => {
const User = new FormData()
User.append('username', form.username)
User.append('password', form.password)

await store.dispatch('login', User)
router.push('/')
}
</script>
