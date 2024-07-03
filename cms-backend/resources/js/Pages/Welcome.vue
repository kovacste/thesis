<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Head title="Welcome" />

    <div id="background"
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <div id="overlay"></div>
        <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="3" class="text-center front">
                <v-card class="card">
                    <v-card-title>
                        <h1 class="text-4xl text-gray-600 dark:text-gray-400">Üdvözöljük!</h1>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="canLogin">
                            <template v-else>
                                <Link
                                    :href="route('login')"
                                    class="font-semibold text-gray-600 text-2xl hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Bejelentkezés</Link
                                >

                                <Link
                                    v-if="canRegister"
                                    :href="route('register')"
                                    class="ml-4 font-semibold text-gray-600 text-2xl hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Regisztráció</Link
                                >
                            </template>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
    </div>
</template>

<style>

@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
.card {
    padding: 50px;
}
.front {
    z-index: 100;
    border-radius: 10px;
}
#background {
    background: url("../../images/background.jpg") no-repeat;
    background-size: contain;
}
#overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1); /* Adjust opacity for desired fading */
    opacity: 0.6; /* Adjust opacity for overall lightening effect */
}
</style>
