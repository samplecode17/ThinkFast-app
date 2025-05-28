<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-18 h-15 mr-2" src="@/assets/ThinkLogo.svg" alt="logo">
        ThinkFast
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
              <input v-model="form.username" type="text" id="username"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     placeholder="Your username" required>
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input v-model="form.email" type="email" id="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     placeholder="name@company.com" required>
            </div>

            <div>
            <label for="date" class="block mb-2 text-sm font-medium text-gray-900">Date</label>
            <div class="relative max-w-sm">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
                </div>
                <input ref="datepickerInput" id="default-datepicker" type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Select date">
            </div>



            </div>


            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input v-model="form.password" type="password" id="password"
                     placeholder="••••••••"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  block w-full p-2.5"
                     required>
            </div>

            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <input v-model="confirmPassword" type="password" id="confirm-password"
                     placeholder="••••••••"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                     required>
              <p v-if="confirmPassword && confirmPassword !== form.password" class="text-red-500 text-sm mt-1">
                Passwords do not match.
              </p>
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox"
                       class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                       required>
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500">
                  I accept the <a class="font-medium text-[#11c3f5] hover:underline" href="#">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <button type="submit"
                    class="w-full text-white bg-[#11c3f5] hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Create an account
            </button>

            <p class="text-sm font-light text-gray-500">
              Already have an account? <a href="#" class="font-medium text-[#11c3f5] hover:underline">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { initFlowbite } from 'flowbite'
import Datepicker from 'flowbite-datepicker/Datepicker'

const router = useRouter()
const store = useStore()

const form = reactive({
  username: '',
  email: '',
  password: '',
  date: '' // will be updated manually
})

const confirmPassword = ref('')
const datepickerInput = ref(null) // reference to the input element

const submit = async () => {
  if (form.password !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  let isoDate = ''
  if (form.date) {
    const parsed = new Date(form.date)
    if (!isNaN(parsed)) {
      isoDate = parsed.toISOString()
    } else {
      const parts = form.date.split(/[\/\-]/)
      if (parts.length === 3) {
        const [month, day, year] = parts[0].length === 2 ? parts : [parts[1], parts[0], parts[2]]
        const reconstructed = new Date(`${year}-${month}-${day}T00:00:00Z`)
        if (!isNaN(reconstructed)) {
          isoDate = reconstructed.toISOString()
        } else {
          alert('Invalid date format')
          return
        }
      }
    }
  }

  const User = {
  email: form.email,
  username: form.username,
  password: form.password,
  age: isoDate
}
  console.log(isoDate)
  try {
    await store.dispatch('register', User)
    router.push('/')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

onMounted(() => {
  initFlowbite()

  const inputEl = datepickerInput.value
  if (!inputEl) return

  const picker = new Datepicker(inputEl)

  inputEl.addEventListener('changeDate', (event) => {
    form.date = event.detail.date // ← manually update the reactive value
  })

  // Optional: if you want to preload a date
  if (form.date) {
    picker.setDate(new Date(form.date))
  }
})
</script>
