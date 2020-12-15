<template>
  <div class="loader-warp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 100 100 100">
      <path
        class="marker2"
        d="M-49.5,125.004c-13.694,0-24.795,11.43-24.795,25.527c0,8.428,4.839,15.507,16.318,30.436  c5.497,7.146,5.499,15.313,8.477,15.313c2.979,0,2.502-7.88,8.432-15.462c11.699-14.966,16.363-21.828,16.363-30.286 C-24.707,136.43-35.808,125.004-49.5,125.004z"
      ></path>
    </svg>
    <div class="warp">
      <div class="loader-bubble"></div>
      <div class="loader-bubble"></div>
      <div class="loader-bubble"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 100 100 100">
        <path
          class="marker1"
          d="M-49.5,125.004c-13.694,0-24.795,11.43-24.795,25.527c0,8.428,4.839,15.507,16.318,30.436  c5.497,7.146,5.499,15.313,8.477,15.313c2.979,0,2.502-7.88,8.432-15.462c11.699-14.966,16.363-21.828,16.363-30.286 C-24.707,136.43-35.808,125.004-49.5,125.004z"
        ></path>
        <defs>
          <filter id="warp">
            <feGaussianBlur
              n="SourceGraphic"
              result="blur"
              stdDeviation="12"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 16 -7"
              result="warp"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>
<style lang="sass" scoped>
$basecolor: '#ccc'
$highcolor: '#016293'

.loader-warp
    width: 100px
    height: 100px
    .warp
        filter: url(#warp)
    .loader-bubble
        width: 0
        height: 0
        position: absolute
        left: 50px
        top: 50px
        &::before
            content: ""
            width: 35px
            height: 35px
            border-radius: 50px
            background: #FBD301
            position: absolute
            left: 50%
            transform: translateY(0)
            margin-left: -17.5px
            margin-top: -17.5px

    svg
        position: absolute
        height: 100px
        width: 100px

    @keyframes loader-bubble-move
        0%,40%, 100%
            transform: translateY(0)
        18%, 22%
            transform: translateY(-70px)

    $i: 1
    $amount: 3
    .marker1, .marker2
        animation: loader-colors #{$amount}s ease infinite

    @while $i < ($amount + 1)
        .loader-bubble:nth-child(#{$i})
            animation: loader-bubble-rotate-#{$i} #{$amount}s #{($i - 1)}s linear infinite
            transform: rotate(-($i/$amount)*360 + deg)
            &::before
                background-color: #FF3270
                animation: loader-bubble-move #{$amount}s #{$i}s ease infinite, loader-colors 3s ease infinite
            @keyframes loader-bubble-rotate-#{$i}
                0%
                    transform: rotate(-($i/$amount)*360 + deg)
                100%
                    transform: rotate(-($i/$amount)*360 + deg)
        $i: $i + 1

@keyframes loader-colors
    0%
        fill: #FBD301
        background-color: #FBD301
    25%
        fill: #FF3270
        background-color: #FF3270
    50%
        fill: #208BF1
        background-color: #208BF1
    75%
        fill: #AFE102
        background-color: #AFE102
    100%
        fill: #FBD301
        background-color: #FBD301
</style>
