/* eslint-disable */
export function imdfStyler (layer) {
    if (layer == 'unit') {
        return {
            'fill-color': {
                type: 'categorical',
                property: 'category',
                default: '#aaa',
                stops: [
                    ['nonpublic', '#C4BFB3'],
                    ['escalator', '#C7DADC'],
                    ['stairs', '#C7DADC'],
                    ['elevator', '#C7DADC'],
                    ['ramp', '#C7DADC'],
                    ['restroom.unisex', '#C7DADC'],
                    ['restroom.male', '#C7DADC'],
                    ['restroom.female', '#C7DADC'],
                    ['restroom', '#C7DADC'],
                    ['parking', '#C7DADC'],
                    ['checkin', '#C7DADC'],
                    ['immigration', 'red'],
                    ['postsecurity', 'red'],
                    ['presecurity', 'green'],
                    ['walkway', '#FEFEFE'],
                    ['room', '#FEEED8'],
                    ['security', '#EECECF'],
                    ['opentobelow', '#eee'],
                    ['privatelounge', '#EECECF']
                ]
            },
            'fill-opacity': 0.5,
            'fill-outline-color': 'rgba(37,37,37,0.3)'
        }
    } else if (layer == 'unit_extrusion') {
        return {
            'fill-extrusion-color': {
                type: 'categorical',
                property: 'category',
                default: '#aaa',
                stops: [
                    ['nonpublic', '#C4BFB3'],
                    ['escalator', '#C7DADC'],
                    ['stairs', '#C7DADC'],
                    ['elevator', '#C7DADC'],
                    ['ramp', '#C7DADC'],
                    ['restroom.unisex', '#C7DADC'],
                    ['restroom.male', '#C7DADC'],
                    ['restroom.female', '#C7DADC'],
                    ['restroom', '#C7DADC'],
                    ['parking', '#C7DADC'],
                    ['checkin', '#C7DADC'],
                    ['immigration', 'red'],
                    ['postsecurity', 'red'],
                    ['presecurity', 'green'],
                    ['walkway', '#FEFEFE'],
                    ['room', '#FEEED8'],
                    ['security', '#EECECF'],
                    ['opentobelow', '#eee'],
                    ['privatelounge', '#EECECF']
                ]
            },
            // 'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': {
                type: 'categorical',
                property: 'category',
                default: 8,
                stops: [
                    ['escalator', 0],
                    ['stairs', 0],
                    ['elevator', 0],
                    ['ramp', 0],
                    ['walkway', 0],
                    ['security', 0],
                    ['opentobelow', 0]
                ]
            },
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.8
            // 'fill-opacity': 0.3,
            // 'fill-outline-color': 'rgba(37,37,37,0.3)'
        }

    } else if (layer == 'route') {
        return {

            'line-width': 5,
            'line-color': {
                type: 'categorical',
                property: 'floor',
                default: '#fff',
                stops: [
                    [10, 'rgba(1, 98, 147, 1)'],
                ]
            }
        }
    }
    else {
        return {
            'fill-color': '#ddd'
        }
    }
}
