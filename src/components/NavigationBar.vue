<template>
  <!-- Show header/navbar only if 'show' is true -->
  <header v-show="show">
    <nav class="fixed top-0 w-full left-0 bg-thinkfast z-50">
      <div class="mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <!-- Mobile menu button (hidden on larger screens) -->
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#343434] hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <!-- Logo and main navigation links -->
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex shrink-0 items-center">
              <img class="h-8 w-auto" src="@/assets/ThinkLogo.svg" alt="Your Company" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a v-if="autheticated" href="/games/All" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Games</a>
                <a v-if="autheticated" href="/creator/games" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Creator</a>
              </div>
            </div>
          </div>

          <!-- User menu and notifications - shown only if authenticated -->
          <div v-if="autheticated" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- Notification button -->
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span class="sr-only">View notifications</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>

            <!-- User avatar and dropdown toggle -->
            <div class="relative ml-3">
              <div>
                <button
                  @click="toggleDropdown"
                  type="button"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="size-8 rounded-full"
                    :src="user?.profile_image || 'https://i.ibb.co/Kc2Cs3rQ/blank-profile-picture-973460-640.webp'"
                    alt="User avatar"
                  />

                </button>
              </div>

              <!-- Dropdown menu shown when toggled -->
              <div
                v-if="showDropdown"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</a>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Show login link if not authenticated -->
          <div v-if="!autheticated" class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a href="/login" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Login</a>
          </div>
        </div>
      </div>

      <!-- Mobile menu links -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Games</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Creator</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Computed property for navbar visibility from the store
const show = computed(() => store.getters.stateNavBar);
// Is autheticated ?
const autheticated = computed(() => store.getters.isAuthenticated)

const user = computed(() => store.getters.stateUser)

// Logout 
const logout = async () => {
  await store.dispatch('logOut');
  router.push('/login');
};


//  (logic for Mobile menu)
const showDropdown = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>