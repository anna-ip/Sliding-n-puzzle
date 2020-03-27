import React, { useState, useEffect } from 'react'
import './App.css'

const sortedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const _ = require('lodash');

const getShuffledArr = () => {
  const newArr = sortedArray.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }

  let newPuzzle = newArr
  return newPuzzle
};

// this gives four arrays of the shuffled one
const newPuzzleArr = (newPuzzle) => {
  let puzzleArr = _.chunk(newPuzzle, 4)
  console.log("getNewArray", puzzleArr);
  return puzzleArr
}

//checks if the puzzle is solvable
const getInversionCount = arr => {
  arr = getShuffledArr(arr).filter(n => n !== 0)
  const inversions = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const currentValue = arr[i]
    const currentInversions = arr.filter(
      (val, j) => i < j && val < currentValue
    )
    inversions.push(currentInversions.length)
  }
  const inversionsCount = inversions.reduce((total, val) => total + val, 0)

  return inversionsCount
}

//checks if its solvable for an even puzzle ex 4x4
const isSolvable = (puzzle) => {
  if (getInversionCount(puzzle) % 2 === 1) {
    return (getInversionCount(puzzle) % 2 === 0)
  } else {
    return (getInversionCount(puzzle) % 2 === 0)
  }
};
isSolvable()

const getPuzzle = () => {
  let puzzle = getShuffledArr()

  while (!isSolvable(puzzle)) {
    puzzle = getShuffledArr()
  }
  return puzzle
}

export const App = () => {
  const [puzzle, setPuzzle] = useState([])
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    setPuzzle(getPuzzle())
  }, [])

  const resetPuzzle = () => {
    setComplete(false)
    setPuzzle(getPuzzle())
  }

  // add the movetiles function here invoked with onClick=>
  // x=vertical move
  // y=horizontal move


  // a function to check if the moving tile is next to 0 =>


  // checks if the puzzle is solved =>
  const checkComplete = (puzzle) => {
    if (newPuzzleArr(puzzle).join('') === '1234567891011121314150') {
      setComplete(true)
    }
  }

  return (
    <div className="screen">
      <div className="background">
        <div className="board">
          {puzzle.map((item, i) => (
            <div key={i} className={item ? "item" : "item hidden"}>
              {/* //onClick should move the Tile if its next to 0 */}
              <button key={item} className="tile" onClick={() => { 'moveTile' }}>{item}</button>
            </div>
          ))}
        </div>
        <button className="shuffle-btn" onClick={() => { resetPuzzle() }}> SLUMPA</button>

        {complete && (
          <div className="complete">
            <h1>Grattis!!</h1>
            <button className="newPuzzleBtn" onClick={() => { resetPuzzle() }}>Ny omgång</button>
          </div>
        )}
      </div>
    </div>
  )
}
