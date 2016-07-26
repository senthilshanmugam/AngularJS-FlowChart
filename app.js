
//
// Define the 'app' module.
//
angular.module('app', ['flowChart', ])

//
// Simple service to create a prompt.
//
.factory('prompt', function () {

    /* Uncomment the following to test that the prompt service is working as expected.
	return function () {
		return "Test!";
	}
	*/

    // Return the browsers prompt function.
    return prompt;
})

//
// Application controller.
//
.controller('AppCtrl', ['$scope', '$sce', 'prompt', function AppCtrl($scope, $sce, prompt) {

    //
    // Code for the delete key.
    //
    var deleteKeyCode = 46;

    //
    // Code for control key.
    //
    var ctrlKeyCode = 17;

    //
    // Set to true when the ctrl key is down.
    //
    var ctrlDown = false;

    //
    // Code for A key.
    //
    var aKeyCode = 65;

    //
    // Code for esc key.
    //
    var escKeyCode = 27;

    //
    // Selects the next node id.
    //
    var nextNodeID = 10;

    //
    // Setup the data-model for the chart.
    //
    var chartDataModel = {

        nodes: [
			{
			    name: "Example Node 1",
			    id: 0,
			    x: 20,
			    y: 20,
			    width: 264,
			    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAADxSURBVDhPjZPNDkVADIU9pFl4AK6Nn41n8k42kxDBysoS91SbprjifonJ6aSnrRkC51ySJGmaft5AGtYwDIOyLPc3tm0Tte9FUZDHbj2hOeTJ85yDP0GPAD6JDrTeuq7TNLG2UB+RJhsCDMOAEbqu403l5GHUCbz3dxvNJtLANl5hy7KsbVutRX3qutazB3Ec467sjUVRVFUVG8CP2Syo3TQNxhvHkUOsCMWjrZWLQaH3WZZFojN932MMGGw5aJrt6dvB/czzzNrayINHooNLVVEHHJIHE2vM3LVdr7PZbGBTGWg6N/wPejnKfQfwpnPuC4XH1eMI4qVSAAAAAElFTkSuQmCC',
			    outputConnectors: [
					{
					    name: "A",
					},
			    ],
			    kpi: [
                    {
                        name: "Count",
                        value: "54020",
                        isPrimary: true,
                    },
                    {
                        name: "Last Received",
                        value: "19Jul 2:05",
                        isPrimary: true,
                    },
                    {
                        name: "US Campaign",
                        value: "2030",
                        isPrimary: true,
                    }
			    ]
			},

			{
			    name: "MARKETO",
			    id: 1,
			    x: 550,
			    y: 20,
			    width: 264,
			    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAIAAACn2JBZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAIWSURBVDhPpVO7y/lhHHWNkjKg3sVgsDH4HyxSLoPLwiBRykhJGA0WRbIhk1sM/AE2i8GgiCJkcUtIru/h8X5fr1/9Fmd4POd8z+c8n+eCfrvdaB8jk8m0Wi3Gk32AbrdbrVaFQuGnWefzOR6Pczgcp9P5aVa5XJ5MJhaLRSQSvWf95/jQwuVyeZIHptNpsViUSqUajYZOp/9mkRRIhBJQ0ev12uPxOByOer1+Op3Ip2Qyeb1e3W43g3HPoYOgHh/IeJd+6D3jgc1mEwwGx+MxRLQmFouNRiMSU6mUTqez2WzPQvJDgF00m02FQsHn858Sjbbf78PhcL/ft1qtx+NRIBDk8/n5fI5chMZiMS6X+7Qii2C1Wvl8PqxjMpnS6TQoxMPh4Pf7IVYqFYSWSiWISKzVana7vd1uP0pv2BxGFkkcDAaRSGS5XH59faEpvBe4VSrVbDbrdDrYkVarRRYKYGaz2Wq1erFYyOVyUIjkQO5ZjUYjkUiwWCyv19vr9QwGw3A4LBQKOGb49Hq92WyGDcAZU5UUfmkul4Pb5XKNRiP4stnsbrfDBMCDDoVCOGxCt9st2SMBnM/ZDxhoSqlURqNRiUSC6Nc1ZTIZ3g6571egDONbdwAD9xoIBHg8HuHER+G1gAqF+OjjjxN4X5PCv1aikJGs8eZ5z8K/lMlkYkLcoA/5DvSFG6RS8Om1a+DPW/0INNo3U/1XJO4enWsAAAAASUVORK5CYII=',
			   // image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAFPSURBVDhPpZLNq4JAFMX9Z1tbiAR9g5UkKAaKtHHjxo0tEtxFLtpGufYDSyEQwRa1yqz7mKlXxnv0eL/FOPfMOd6ZUeL6d/6dKYoCz96I47jT6VAUtVqtfsyU8qIoLhaLIAiazeZvmedyMpmYprlerweDAc6UHIhnkWVZhmHG4zFs8qWP4zg8z89mM1zfURRF13VcPN/B8XgkSXKz2XAcB1sHJcsyKMEtCALyXC4XGIlH9yRJGo0GTKbTaa1Wg7HVaoG7Wq2maYo8iO8++/2+Uql0u124Itd1+/2+YRigj0Yj3/eRB0HkeW7b9nw+h7fC2ul0AgUWttstfA1N09rt9uFwQG4EIUmSLMvD4VBVVazdCcPQsiw4Fa7vEDRNn8/n3W4HMay98TgzgoBN93q9er2+XC6RVHK883VvnudFUYSFTzL4+YH1wct/8BHX6w3jHBcL8xpwXAAAAABJRU5ErkJggg==',
			    inputConnectors: [
					{
					    name: "A",
					}
			    ],
			    outputConnectors: [
					/*{
					    name: "A",
					},
					{
					    name: "B",
					},
					{
					    name: "C",
					},*/
			    ],
			    kpi: [
                    {
                        name: "Count",
                        value: "12570",
                    },
                    {
                        name: "Last Received",
                        value: "19Jul 2:05",
                    },
                    {
                        name: "New Leads - Trial",
                        value: "2030",
                    },
                    {
                        name: "New Leads - Org.",
                        value: "3545",
                    }
			    ]
			},

        ],

        connections: [
			{
			    name: 'Connection 2',
			    message1: 'Average Delay 45 min',
			    message2: 'Skipped 67%',
			    color: 'rgb(200,0,0)',
			    source: {
			        nodeID: 0,
			        connectorIndex: 0,
			    },

			    dest: {
			        nodeID: 1,
			        connectorIndex: 0,
			    },
			},

        ]
    };

    //
    // Event handler for key-down on the flowchart.
    //
    $scope.keyDown = function (evt) {

        if (evt.keyCode === ctrlKeyCode) {

            ctrlDown = true;
            evt.stopPropagation();
            evt.preventDefault();
        }
    };

    //
    // Event handler for key-up on the flowchart.
    //
    $scope.keyUp = function (evt) {

        if (evt.keyCode === deleteKeyCode) {
            //
            // Delete key.
            //
            $scope.chartViewModel.deleteSelected();
        }

        if (evt.keyCode == aKeyCode && ctrlDown) {
            // 
            // Ctrl + A
            //
            $scope.chartViewModel.selectAll();
        }

        if (evt.keyCode == escKeyCode) {
            // Escape.
            $scope.chartViewModel.deselectAll();
        }

        if (evt.keyCode === ctrlKeyCode) {
            ctrlDown = false;

            evt.stopPropagation();
            evt.preventDefault();
        }
    };

    //
    // Add a new node to the chart.
    //
    $scope.addNewNode = function () {

        var nodeName = prompt("Enter a node name:", "New node");
        if (!nodeName) {
            return;
        }

        //
        // Template for a new node.
        //
        var newNodeDataModel = {
            name: nodeName,
            id: nextNodeID++,
            x: 0,
            y: 0,
            inputConnectors: [
				{
				    name: "X"
				},
				{
				    name: "Y"
				},
				{
				    name: "Z"
				}
            ],
            outputConnectors: [
				{
				    name: "1"
				},
				{
				    name: "2"
				},
				{
				    name: "3"
				}
            ],
        };

        $scope.chartViewModel.addNode(newNodeDataModel);
    };

    //
    // Add an input connector to selected nodes.
    //
    $scope.addNewInputConnector = function () {
        var connectorName = prompt("Enter a connector name:", "New connector");
        if (!connectorName) {
            return;
        }

        var selectedNodes = $scope.chartViewModel.getSelectedNodes();
        for (var i = 0; i < selectedNodes.length; ++i) {
            var node = selectedNodes[i];
            node.addInputConnector({
                name: connectorName,
            });
        }
    };

    //
    // Add an output connector to selected nodes.
    //
    $scope.addNewOutputConnector = function () {
        var connectorName = prompt("Enter a connector name:", "New connector");
        if (!connectorName) {
            return;
        }

        var selectedNodes = $scope.chartViewModel.getSelectedNodes();
        for (var i = 0; i < selectedNodes.length; ++i) {
            var node = selectedNodes[i];
            node.addOutputConnector({
                name: connectorName,
            });
        }
    };

    //
    // Delete selected nodes and connections.
    //
    $scope.deleteSelected = function () {

        $scope.chartViewModel.deleteSelected();
    };

    //
    // Create the view-model for the chart and attach to the scope.
    //
    //debugger;
    $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel, $sce);



}])
;