export const locationsCenter = {
    taiwan: [120.733393686039, 24.196575671135506],
    northArea: [121.26193463982423, 24.808416929421213],
    taipei: [121.55585298158064, 25.05244617333119]
}

export const initZoom = {
    taiwan:7,
    taipei:12,
    heatmp: 16.5,
    maxZoom: 18
}

/** maxBound
 *  [Southwest coordinates, Northeast coordinates]
 */
export const maxBound = {
    taiwan: [
        [118.06372184152644, 21.810549724023645],
        [122.62304381162107, 26.371897242606593]
    ],
    northArea: [
        [120.74234593082292, 24.34024913865882],
        [122.03570856000556, 25.30655033147835]
    ],
    taipei: [
        [121.48406601135343, 24.98549593389238],
        [121.6198909438732, 25.134557481569985]
    ]
}

export const durationConfig = 5000
export const fitPadding = {
    top: 5, 
    bottom:5, 
    left: 5, 
    right: 5
}
export const fitBoundsConfig = {
    padding: fitPadding,
    duration: durationConfig,
    maxZoom: initZoom.maxZoom + 1
}
