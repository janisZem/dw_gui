function init() {
    if (window.goSamples)
        goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    myDiagram =
            $(go.Diagram, "myDiagram", // must name or refer to the DIV HTML element
                    {
                        initialContentAlignment: go.Spot.Center,
                        allowDelete: false,
                        allowCopy: false,
                        layout: $(go.ForceDirectedLayout),
                        "undoManager.isEnabled": true
                    });
    // define several shared Brushes
    var bluegrad = $(go.Brush, "Linear", {0: "rgb(150, 150, 250)", 0.5: "rgb(86, 86, 186)", 1: "rgb(86, 86, 186)"});
    var greengrad = $(go.Brush, "Linear", {0: "rgb(158, 209, 159)", 1: "rgb(67, 101, 56)"});
    var redgrad = $(go.Brush, "Linear", {0: "rgb(206, 106, 100)", 1: "rgb(180, 56, 50)"});
    var yellowgrad = $(go.Brush, "Linear", {0: "rgb(254, 221, 50)", 1: "rgb(254, 182, 50)"});
    var lightgrad = $(go.Brush, "Linear", {1: "#E6E6FA", 0: "#FFFAF0"});
    function makeButton(text, action, visiblePredicate) {
        return $("ContextMenuButton",
                $(go.TextBlock, text),
                {click: action},
        // don't bother with binding GraphObject.visible if there's no predicate
                visiblePredicate ? new go.Binding("visible", "", visiblePredicate).ofObject() : {});
    }

    function nodeInfo(d) {  // Tooltip info for a node data object
        var str = "Node " + d.key + ": " + d.text + "\n";
        if (d.group)
            str += "member of " + d.group;
        else
            str += "top-level node";
        return str;
    }
    var partContextMenu =
            $(go.Adornment, "Vertical",
                    makeButton("Properties",
                            function (e, obj) { 
                                var contextmenu = obj.part;  // the Button is in the context menu Adornment
                                var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
                                // now can do something with PART, or with its data, or with the Adornment (the context menu)
                                if (part instanceof go.Link)
                                    alert(linkInfo(part.data));
                                else if (part instanceof go.Group)
                                    alert(groupInfo(contextmenu));
                                else
                                    alert(nodeInfo(part.data));
                            }),
                    makeButton("Cut",
                            function (e, obj) {
                                e.diagram.commandHandler.cutSelection();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canCutSelection();
                            }),
                    makeButton("Copy",
                            function (e, obj) {
                                e.diagram.commandHandler.copySelection();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canCopySelection();
                            }),
                    makeButton("Paste",
                            function (e, obj) {
                                e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint);
                            },
                            function (o) {
                                return o.diagram.commandHandler.canPasteSelection();
                            }),
                    makeButton("Delete",
                            function (e, obj) {
                                e.diagram.commandHandler.deleteSelection();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canDeleteSelection();
                            }),
                    makeButton("Undo",
                            function (e, obj) {
                                e.diagram.commandHandler.undo();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canUndo();
                            }),
                    makeButton("Redo",
                            function (e, obj) {
                                e.diagram.commandHandler.redo();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canRedo();
                            }),
                    makeButton("Group",
                            function (e, obj) {
                                e.diagram.commandHandler.groupSelection();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canGroupSelection();
                            }),
                    makeButton("Ungroup",
                            function (e, obj) {
                                e.diagram.commandHandler.ungroupSelection();
                            },
                            function (o) {
                                return o.diagram.commandHandler.canUngroupSelection();
                            })
                    );

    // the template for each attribute in a node's array of item data
    var itemTempl =
            $(go.Panel, "Horizontal",
                    $(go.Shape,
                            {desiredSize: new go.Size(10, 10)},
                            new go.Binding("figure", "figure"),
                            new go.Binding("fill", "color")),
                    $(go.TextBlock,
                            {stroke: "#333333",
                                font: "bold 14px sans-serif"},
                            new go.Binding("text", "name"))
                    );
    // define the Node template, representing an entity
    myDiagram.nodeTemplate =
            $(go.Node, "Auto", // the whole node panel
                    {selectionAdorned: true,
                        resizable: true,
                        layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                        fromSpot: go.Spot.AllSides,
                        toSpot: go.Spot.AllSides,
                        isShadowed: true,
                        shadowColor: "#C5C1AA"
                    },
                    new go.Binding("location", "location").makeTwoWay(),
                    // define the node's outer shape, which will surround the Table
                    $(go.Shape, "Rectangle",
                            {fill: lightgrad, stroke: "#756875", strokeWidth: 3}),
                    $(go.Panel, "Table",
                            {margin: 8, stretch: go.GraphObject.Fill},
                            $(go.RowColumnDefinition, {row: 0, sizing: go.RowColumnDefinition.None}),
                            // the table header
                            $(go.TextBlock,
                                    {
                                        row: 0, alignment: go.Spot.Center,
                                        margin: new go.Margin(0, 14, 0, 2), // leave room for Button
                                        font: "bold 16px sans-serif"
                                    },
                                    new go.Binding("text", "key")),
                            // the collapse/expand button
                            $("PanelExpanderButton", "LIST", // the name of the element whose visibility this button toggles
                                    {row: 0, alignment: go.Spot.TopRight}),
                            // the list of Panels, each showing an attribute
                            $(go.Panel, "Vertical",
                                    {
                                        name: "LIST",
                                        row: 1,
                                        padding: 3,
                                        alignment: go.Spot.TopLeft,
                                        defaultAlignment: go.Spot.Left,
                                        stretch: go.GraphObject.Horizontal,
                                        itemTemplate: itemTempl
                                    },
                                    new go.Binding("itemArray", "items"))
                            ),{// this tooltip Adornment is shared by all nodes
                        toolTip:
                                $(go.Adornment, "Auto",
                                        $(go.Shape, {fill: "#FFFFCC"}),
                                        $(go.TextBlock, {margin: 4}, // the tooltip shows the result of calling nodeInfo(data)
                                                new go.Binding("text", "", nodeInfo))
                                        ),
                        // this context menu Adornment is shared by all nodes
                        contextMenu: partContextMenu
                    }  // end Table Panel
                    );  // end Node
    // define the Link template, representing a relationship
    myDiagram.linkTemplate =
            $(go.Link, // the whole link panel
                    {
                        selectionAdorned: true,
                        layerName: "Foreground",
                        reshapable: true,
                        routing: go.Link.AvoidsNodes,
                        corner: 5,
                        curve: go.Link.JumpOver
                    },
                    $(go.Shape, // the link shape
                            {stroke: "#303B45", strokeWidth: 2.5}),
                    $(go.TextBlock, // the "from" label
                            {
                                textAlign: "center",
                                font: "bold 14px sans-serif",
                                stroke: "#1967B3",
                                segmentIndex: 0,
                                segmentOffset: new go.Point(NaN, NaN),
                                segmentOrientation: go.Link.OrientUpright
                            },
                            new go.Binding("text", "text")),
                    $(go.TextBlock, // the "to" label
                            {
                                textAlign: "center",
                                font: "bold 14px sans-serif",
                                stroke: "#1967B3",
                                segmentIndex: -1,
                                segmentOffset: new go.Point(NaN, NaN),
                                segmentOrientation: go.Link.OrientUpright
                            },
                            new go.Binding("text", "toText"))
                                    
                    );
    // create the model for the E-R diagram


    myDiagram.model = new go.GraphLinksModel(myArr, myRels);
}