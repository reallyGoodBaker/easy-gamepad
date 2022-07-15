import {gamepads, XboxKeys} from './src/index.js'

const ls = document.getElementById('ls'),
    rs = document.getElementById('rs'),
    lsb = document.getElementById('lsb'),
    rsb = document.getElementById('rsb'),
    A = document.getElementById('A'),
    B = document.getElementById('B'),
    X = document.getElementById('X'),
    Y = document.getElementById('Y'),
    up = document.getElementById('up'),
    down = document.getElementById('down'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    menu = document.getElementById('menu'),
    view = document.getElementById('view'),
    lb = document.getElementById('LB'),
    rb = document.getElementById('RB'),
    lt = document.getElementById('LT'),
    rt = document.getElementById('RT'),
    home = document.getElementById('Home')

function bindAxel(controller, element, axelIndex, propName) {
    controller.addAxelChangeListener(axelIndex, val => {
        val = 124 * (val + 1)/2
        element.style.setProperty(propName, val + 'px')
    })
}

function bindKey(controller, element, btnIndex) {
    controller.addPressListener(btnIndex, () => {
        element.style.backgroundColor = 'teal'
    })

    controller.addReleaseListener(btnIndex, () => {
        element.style.backgroundColor = 'transparent'
    })
}


function bindValue(controller, element, btnIndex) {
    controller.addValueChangeListener(btnIndex, val => {
        val = (100 * val)
        element.style.setProperty('--progress', val + '%')
    })
}

gamepads.onConnect(controller => {
    console.log('Controller "%s" is connected', controller.id);

    controller.vibrate(1000, 1, 1)

    bindAxel(controller, lsb, XboxKeys.AxelLeftHorizontal, '--left')
    bindAxel(controller, lsb, XboxKeys.AxelLeftVertical, '--top')
    bindAxel(controller, rsb, XboxKeys.AxelRightHorizontal, '--left')
    bindAxel(controller, rsb, XboxKeys.AxelRightVertical, '--top')

    bindKey(controller, A, XboxKeys.A)
    bindKey(controller, B, XboxKeys.B)
    bindKey(controller, X, XboxKeys.X)
    bindKey(controller, Y, XboxKeys.Y)

    bindKey(controller, up, XboxKeys.Up)
    bindKey(controller, down, XboxKeys.Down)
    bindKey(controller, left, XboxKeys.Left)
    bindKey(controller, right, XboxKeys.Right)

    bindKey(controller, menu, XboxKeys.Menu)
    bindKey(controller, view, XboxKeys.View)

    bindKey(controller, ls, XboxKeys.LS)
    bindKey(controller, rs, XboxKeys.RS)

    bindKey(controller, lb, XboxKeys.LB)
    bindKey(controller, rb, XboxKeys.RB)

    bindValue(controller, lt, XboxKeys.LT)
    bindValue(controller, rt, XboxKeys.RT)

    bindKey(controller, home, XboxKeys.Home)
})

gamepads.onDisconnect(con => {
    console.log('Controller "%s" is disconnected', con.id);
})