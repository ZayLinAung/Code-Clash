import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Problem = () => {
  return (
    <div className="flex flex-col h-[85vh] gap-[20px]">
      <div className="p-[30px] h-[70%] flex flex-col gap-[20px] border-2 border-solid border-black shadow-custom rounded-lg overflow-auto resize-y">
        <div>
          <div className="font-bold text-[28px]">Problem</div>
        </div>
        <div>
          Given an array of integers nums and an integer target, return indices
          of the two numbers such that they add up to target. You may assume
          that each input would have exactly one solution, and you may not use
          the same element twice. You can return the answer in any order.
        </div>
        <div>
          <div className = "font-bold">Example 1</div>
          <div>
            Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation:
            Because nums[0] + nums[1] == 9, we return [0, 1].
          </div>
          
        </div>
      </div>
      <div className="p-[30px] flex-1 flex flex-col gap-[20px] border-2 border-solid border-black shadow-custom rounded-lg">
        <div>Your test cases: </div>
        <ProgressBar variant="success" now={90} />
        <div>Opponents test cases:</div>
        <ProgressBar variant="danger" now = {50}/>
      </div>
    </div>
  );
};

export default Problem;
