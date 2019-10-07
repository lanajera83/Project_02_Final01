
        

        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // window.onload event for Javascript to run after HTML
      
        // because this Javascript is injected into the document head
        window.addEventListener('load', () => {
            // Javascript code to execute after DOM content
            
            // full ZingChart schema can be found here:
            // https://www.zingchart.com/docs/api/json-configuration/

            var chartConfig1 = {
                type: 'bar',
                title: {
                    text: 'Price per day of the Week',
                    fontSize: 24,
                },
                legend: {
                    draggable: true,
                },
                scaleX: {
                    // set scale label
                    label: {
                        text: 'Days of the Week'
                    },
                    // convert text on scale indices
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                scaleY: {
                    // scale label with unicode character
                    label: {
                        text: 'Price in U$D'
                    }
                },
                plot: {
                    // animation docs here:
                    // https://www.zingchart.com/docs/tutorials/design-and-styling/chart-animation/#animation__effect
                    animation: {
                        effect: 'ANIMATION_EXPAND_BOTTOM',
                        method: 'ANIMATION_STRONG_EASE_OUT',
                        sequence: 'ANIMATION_BY_NODE',
                        speed: 275,
                    }
                },
                series: [{
                        // plot 1 values, linear data
                        'background-color': "#00355f",
                        values: [23, 20, 27, 29, 25, 17, 15],
                        text: 'October 2019',
                    },
                    {
                        // plot 2 values, linear data
                        'background-color': "#5cc9ef",
                        values: [35, 42, 33, 49, 35, 47, 35],
                        text: 'November 2019'
                    },
                    {
                        // plot 2 values, linear data
                        'background-color': "#eec218",
                        values: [15, 22, 13, 33, 44, 27, 31],
                        text: 'December 2019'
                    }
                ]
            };
            
            let chartConfig2 = {
                type: 'hbar',
                title: {
                    text: 'Price per Airline',
                    fontSize: 24,
                },
                legend: {
                    draggable: true,
                },
                scaleX: {
                    // set scale label
                    label: {
                        text: 'Airlines'
                    },
                    // convert text on scale indices
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                scaleY: {
                    // scale label with unicode character
                    label: {
                        text: 'Price in U$D'
                    }
                },
                plot: {
                    // animation docs here:
                    // https://www.zingchart.com/docs/tutorials/design-and-styling/chart-animation/#animation__effect
                    animation: {
                        effect: 'ANIMATION_EXPAND_BOTTOM',
                        method: 'ANIMATION_STRONG_EASE_OUT',
                        sequence: 'ANIMATION_BY_NODE',
                        speed: 275,
                    }
                },
                series: [{
                        'background-color': "#00355f",
                        // plot 1 values, linear data
                        values: [23, 20, 27, 29, 25, 17, 15],
                        text: 'Week 1',
                    },
                    {
                        'background-color': "#5cc9ef",
                        // plot 2 values, linear data
                        values: [35, 42, 33, 49, 35, 47, 35],
                        text: 'Week 2'
                    },
                    {
                        'background-color': "#eec218",
                        // plot 2 values, linear data
                        values: [15, 22, 13, 33, 44, 27, 31],
                        text: 'Week 3'
                    }
                ]
            };

            let chartConfig3 = {
                type: 'line',
                title: {
                    text: 'Price through months',
                    fontSize: 24,
                },
                legend: {
                    draggable: true,
                },
                scaleX: {
                    // set scale label
                    label: {
                        text: 'Months'
                    },
                    // convert text on scale indices
                    labels: ['Oct', 'Nov', 'Dec']
                },
                scaleY: {
                    // scale label with unicode character
                    label: {
                        text: 'Price in U$D'
                    }
                },
                plot: {
                    // animation docs here:
                    // https://www.zingchart.com/docs/tutorials/design-and-styling/chart-animation/#animation__effect
                    animation: {
                        effect: 'ANIMATION_EXPAND_BOTTOM',
                        method: 'ANIMATION_STRONG_EASE_OUT',
                        sequence: 'ANIMATION_BY_NODE',
                        speed: 275,
                    }
                },
                series: [{
                        // plot 1 values, linear data
                        'line-color': "#00355f",
                        marker: {
                        'background-color': "#00355f",
                        'border-color': "#00355f",
                        'border-width': 2},
                        values: [23, 20, 27],
                        text: 'Airline1',
                    },
                    {
                        // plot 2 values, linear data
                        'line-color': "#5cc9ef",
                        marker: {
                        'background-color': "#5cc9ef",
                        'border-color': "#5cc9ef",
                        'border-width': 2},
                        values: [35, 42, 33],
                        text: 'Airline2'
                    },
                    {
                        // plot 2 values, linear data
                        'line-color': "#eec218",
                        marker: {
                        'background-color': "#eec218",
                        'border-color': "#eec218",
                        'border-width': 2},
                        values: [15, 22, 13],
                        text: 'Airline3'
                    }
                ]
            };


 
            // render chart with width and height to
            // fill the parent container CSS dimensions
            zingchart.render({
                id: 'myChart',
                data: chartConfig1,
                height: '100%',
                width: '100%'
                
            });

            zingchart.render({
                id: 'myChart2',
                data: chartConfig2,
                height: '100%',
                width: '100%'
                
            });

            zingchart.render({
                id: 'myChart3',
                data: chartConfig3,
                height: '100%',
                width: '100%'
            });
        });