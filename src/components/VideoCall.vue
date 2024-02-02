<template>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Ivy Streams</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    <body>

        <button id="join-btn">Join Stream</button>

        <div id="stream-wrapper">
            <div id="video-streams"></div>

            <div id="stream-controls">
                <button id="leave-btn">Leave Stream</button>
                <button id="mic-btn">Mic On</button>
                <button id="camera-btn">Camera on</button>
            </div>
        </div>
        
    </body>

</template>

<script>

import { videoBackend } from "@/helpers/video-backend";
import { ref, onMounted } from 'vue';

export default {
  setup() {
    onMounted(async () => {
      videoBackend()
    })

    return{
    }
  }
}
</script>

<style scoped>
body{
    background:#0F2027;
    background:-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027) ;
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
}

#join-btn {
    background-color: rgb(195, 26, 26);
    border: 2px solid black; /* Add a black border */
    top: 50%;
    left: 50%;
    position: absolute;
    margin-top: -50px;
    margin-left: -100px;
    font-size: 20px;
    font-weight: 600;
    padding: 20px 40px;
    transition: background-color 0.3s ease, border-color 0.3s ease; /* Add a transition for background-color and border-color */
}

#join-btn:hover {
    /* Change the background color to white on hover */
    border-color: white; /* Change the border color to white on hover */
    cursor: pointer;
}


#video-streams{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    height: 90vh;
    width: 1400px;
    margin:0 auto;
}

.agora_video_player{
    position: fixed !important;
}

.video-container{
    max-height: 100%;
    border: 2px solid black;
    background-color: #921c1c;
}

.video-player{
    height: 100%;
    width: 100%;
}
#agora-video-player-track-video-1570342738-client-bf498_326e9 {
        position:fixed;
}

button{
    border:none;
    background-color: #d21414;
    color:#fff;
    padding:10px 20px;
    font-size:16px;
    margin:2px;
    cursor: pointer;
}

#stream-controls{
    display: none;
    justify-content: center;
    margin-top:0.5em;
}

@media screen and (max-width:1400px){
    #video-streams{
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        width: 95%;
    }
}

</style>


