import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import Navbar from "../Components/Global/Navbar";
import { IoShareOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";

const SingleBlog = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-w-[1100px]">
          <div className="max-w-[700px] mx-auto mt-10">
            {/* Top Section with profile and oyher details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={localStorage.getItem("blogProfileImg")}
                  width={45}
                  alt="profileImg"
                />
                <div>
                  <h2 className="font-medium">Jeet Chawda</h2>
                  <div className="flex gap-2 text-zinc-600 font-medium text-[15px]">
                    <h2>Sep 16</h2>
                    <h2> . </h2>
                    <h2>5 min read</h2>
                  </div>
                </div>
              </div>
              <div className="flex text-[22px] gap-5 text-zinc-500">
                <CiBookmarkPlus />
                <FiMoreHorizontal />
              </div>
            </div>
            {/* Title */}
            <h1 className="text-[30px] font-bold my-6">
              Don’t Just LeetCode; Follow the Coding Patterns Instead
            </h1>
            <h2>
              Coding Interviews are getting harder to pass. To prepare for
              coding interviews, you will need weeks, if not months of
              preparation. No one really likes spending that much time preparing
              for the coding interviews. So is there a smarter solution? First,
              let’s look at the problem. Anyone preparing for coding interviews
              definitely knows LeetCode. It is probably the biggest online
              repository for coding interview questions. Let’s take a look at
              what problems people face when using LeetCode. Problems with
              LeetCode There are more than 2k problems in LeetCode. The biggest
              challenge with LeetCode is its lack of organization; it has a huge
              set of coding problems, and one isn’t sure where to start or what
              to focus on. One wonders, is there an adequate number of questions
              one should go through to consider themselves prepared for the
              coding interview? I would love to see a streamlined process that
              guides me and teaches me enough algorithmic techniques to feel
              confident for the interview. As a lazy person myself, I wouldn’t
              like to go through 500+ questions. The Solution One technique that
              people often follow is to solve questions related to the same data
              structure; for example, focusing on questions related to Arrays,
              then LinkedList, HashMap, Heap, Tree, or Trie, etc. Although this
              does provide some organization, it still lacks coherence. For
              example, many questions can be solved using HashMaps but still
              require different algorithmic techniques. I would love to see
              question sets that follow not only the same data structure but
              also similar algorithmic techniques. The best thing I came across
              was the problem-solving patterns like Sliding Window, Fast and
              Slow Pointers, Topological Sort, etc. Following these patterns
              helped me nurture my ability to ‘map a new problem to an already
              known problem’. This not only made this whole
              coding-interview-preparation process fun but also a lot more
              organized. Coding patterns enhance our “ability to map a new
              problem to an already known problem.” Coding Patterns I have
              gathered around 20 of these coding problem patterns that I believe
              can help anyone learn these beautiful algorithmic techniques and
              make a real difference in the coding interviews. The idea behind
              these patterns is that once you’re familiar with a pattern, you’ll
              be able to solve dozens of problems with it. For a detailed
              discussion of these patterns and related problems with solutions,
              take a look at Grokking the Coding Interview. So, without further
              ado, let me list all these patterns: Sliding Window Islands
              (Matrix Traversal) Two Pointers Fast & Slow Pointers Merge
              Intervals Cyclic Sort In-place Reversal of a LinkedList Tree
              Breadth-First Search Tree Depth First Search Two Heaps Subsets
              Modified Binary Search Bitwise XOR Top ‘K’ Elements K-way Merge
              Topological Sort 0/1 Knapsack Fibonacci Numbers Palindromic
              Subsequence Longest Common Substring Following is a small intro of
              each of these patterns with sample problems:
            </h2>
            {/* Like and comment section */}
            <div className="flex justify-between text-[20px] items-center text-zinc-500 mt-[30px] pb-[60px] border-b-[1px] border-solid-black">
              <div className="flex items-center gap-5">
                <AiOutlineLike />
                <GoComment />
              </div>
              <div className="flex items-center gap-5 text-[25px]">
                <IoShareOutline />
                <CiBookmarkPlus />
                <FiMoreHorizontal />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SingleBlog;
