    // Start Game Button On Click
    document.querySelector(".control-buttons span").onclick = function () {

        // After Clicking This Message Will Appear By Using Prompt
        let yourName = prompt("Whats Your Name?");
        
        // If The User Didnt Write Anything
        if (yourName == null || yourName == "") {
            
            // Prints Unknown
            document.querySelector(".name span").innerHTML = 'Unknown';

        } else {
            // Prints The Selected Name
            document.querySelector(".name span").innerHTML = yourName;

        }
        // Remove The Splash Screen 
        document.querySelector(".control-buttons").remove();

        // Play The Game Song
        document.getElementById('game-song').play();

    };
    // Effect Duration
    let duration = 1000;

    // Selecting The Whole Blocks Container
    let blocksContainer = document.querySelector(".memory-game-blocks");

    // Putting It In Array
    let blocks = Array.from(blocksContainer.children);

    // Setting The Keys Of The Blocks, Using The Spread Operator To Extract Inside The Array, It Will Show Us The Indexes In An Array
    let orderRange = Array.from(Array(blocks.length).keys());

    // Calling The Shuffle Function
    // console.log(orderRange); 
    shuffle(orderRange);
    // console.log(orderRange);

    // Add Order Css Property To Game Blocks
    blocks.forEach((block, index) => {

        // Setting The Order 
        block.style.order = orderRange[index];
        
        // Add Click Event
        block.addEventListener('click', function () {

            // Trigger The Flip Block Function
            flipBlock(block);
        });

    });

    // Flip Block Function
    function flipBlock(selectedBlock) {

        // Add Class is-flipped 
        selectedBlock.classList.add('is-flipped');

        // Collect All Flipped Cards By Filtering 
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

        // If Theres Two Selected Blocks
        if (allFlippedBlocks.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function From The Two Flipped Blocks With Two Indexes
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        }

    }

    // Stop Clicking Function
    function stopClicking() {

        // Add Class No Clicking on Main Container 
        blocksContainer.classList.add('no-clicking');

        // Wait Duration
        setTimeout(() => {

            // Remove Class No Clicking After Duration
            blocksContainer.classList.remove('no-clicking');

        }, duration);
    }

    // Function To Check If All Blocks Have Been Matched 
    function checkGameCompletion() {
        
        let allBlocks = Array.from(document.querySelectorAll('.game-block'));
        let unmatchedBlocks = allBlocks.filter(block => !block.classList.contains('has-match'));
        if (unmatchedBlocks.length === 0) {
            // Game completed
            showCompletionMessage();
        }
    }

    // Check Matched Blocks Function
    function checkMatchedBlocks(firstBlock, secondBlock) {

        // Getting The Tries Element 
        let triesElement = document.querySelector('.tries span');

        // If Condition To Check If The Two Blocks Are Equal
        if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

            // Remove The is-flipped Class
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            // Add The has-match Class
            firstBlock.classList.add('has-match');
            secondBlock.classList.add('has-match');

            document.getElementById('success').play();  

            checkGameCompletion();

        } else {

            // Add One To The Number Of Tries
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

            // Set TimeOut For The UnMatch Blocks So We Can See Them And Flip Also 
            setTimeout(() => {

            // Removing The Is Flipped Class To Be Back To Normal
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

            }, duration);

            document.getElementById('fail').play();

        }

    }

// Function to show completion message
function showCompletionMessage() {
    // Create the pop-up message element
    const message = document.createElement('div');
    message.classList.add('alert');
    message.innerHTML = 'Congratulations! You have completed the game.';
    
    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    
    // Add an event listener to the close button to remove the pop-up message when clicked
    closeButton.addEventListener('click', function() {
        message.remove();
    });
    
    // Append the close button to the pop-up message
    message.appendChild(closeButton);
    
    // Append the pop-up message to the document body
    document.body.appendChild(message);
}

    // Shuffle Function
    function shuffle(array) {

        // Settings Vars
        let current = array.length,     
            temp,                         
            random;

        while (current > 0) {

            // Get Random Number 
            random = Math.floor(Math.random()* current);

            // Decrease Length By One
            current--;

            // Save Current Element In Stash 
            temp = array[current];

            // Current Element = Random Element
            array[current] = array[random];

            // Random Element = Get Element From Stash 
            array[random] = temp;   
        }

        return array;

    };


