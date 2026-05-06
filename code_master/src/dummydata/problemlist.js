const problems = [
  {
    name: "Two Sum",
    difficulty: "Easy",
    tag: "Array",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    explanation: "Use a hash map to store each number and check if (target - current number) exists."
  },
  {
    name: "Reverse Linked List",
    difficulty: "Easy",
    tag: "Linked List",
    statement: "Reverse a singly linked list.",
    explanation: "Iteratively change pointers using previous, current, and next nodes."
  },
  {
    name: "Binary Search",
    difficulty: "Easy",
    tag: "Binary Search",
    statement: "Given a sorted array, search for a target value and return its index.",
    explanation: "Use divide and conquer by repeatedly splitting the array in half."
  },
  {
    name: "Valid Parentheses",
    difficulty: "Easy",
    tag: "Stack",
    statement: "Check if a string containing '(', ')', '{', '}', '[' and ']' is valid.",
    explanation: "Use a stack to match opening and closing brackets."
  },
  {
    name: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tag: "Linked List",
    statement: "Merge two sorted linked lists into one sorted list.",
    explanation: "Compare nodes of both lists and merge in sorted order."
  },
  {
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tag: "String",
    statement: "Find the length of the longest substring without repeating characters.",
    explanation: "Use sliding window with a set or map to track characters."
  },
  {
    name: "3Sum",
    difficulty: "Medium",
    tag: "Array",
    statement: "Find all unique triplets in the array which give the sum of zero.",
    explanation: "Sort array and use two pointers for each fixed element."
  },
  {
    name: "Container With Most Water",
    difficulty: "Medium",
    tag: "Two Pointers",
    statement: "Find two lines that together with x-axis form a container that holds the most water.",
    explanation: "Use two pointers from both ends and move the smaller height."
  },
  {
    name: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    tag: "Binary Search",
    statement: "Find the minimum element in a rotated sorted array.",
    explanation: "Use binary search to locate the rotation point."
  },
  {
    name: "Group Anagrams",
    difficulty: "Medium",
    tag: "Hashing",
    statement: "Group words that are anagrams of each other.",
    explanation: "Sort each word or use character frequency as a key."
  },
  {
    name: "Top K Frequent Elements",
    difficulty: "Medium",
    tag: "Heap",
    statement: "Return the k most frequent elements in an array.",
    explanation: "Use a hashmap + min heap to track frequencies."
  },
  {
    name: "Product of Array Except Self",
    difficulty: "Medium",
    tag: "Array",
    statement: "Return an array where each element is product of all elements except itself.",
    explanation: "Use prefix and suffix product arrays."
  },
  {
    name: "Clone Graph",
    difficulty: "Medium",
    tag: "Graph",
    statement: "Clone an undirected graph.",
    explanation: "Use DFS or BFS with a hashmap to track visited nodes."
  },
  {
    name: "Word Break",
    difficulty: "Medium",
    tag: "Dynamic Programming",
    statement: "Check if a string can be segmented into dictionary words.",
    explanation: "Use DP to check all possible substrings."
  },
  {
    name: "Longest Increasing Subsequence",
    difficulty: "Medium",
    tag: "Dynamic Programming",
    statement: "Find the length of the longest increasing subsequence.",
    explanation: "Use DP or binary search (patience sorting technique)."
  },
  {
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tag: "Binary Search",
    statement: "Find the median of two sorted arrays.",
    explanation: "Use binary search on partitioning of both arrays."
  },
  {
    name: "Trapping Rain Water",
    difficulty: "Hard",
    tag: "Two Pointers",
    statement: "Calculate how much rain water can be trapped after raining.",
    explanation: "Use two pointers with leftMax and rightMax tracking."
  },
  {
    name: "N-Queens",
    difficulty: "Hard",
    tag: "Backtracking",
    statement: "Place N queens on an N×N chessboard so that no two queens attack each other.",
    explanation: "Use backtracking to try all valid queen placements."
  },
  {
    name: "Merge K Sorted Lists",
    difficulty: "Hard",
    tag: "Heap",
    statement: "Merge k sorted linked lists into one sorted list.",
    explanation: "Use a min heap to always pick smallest node."
  },
  {
    name: "Word Ladder",
    difficulty: "Hard",
    tag: "Graph",
    statement: "Find the shortest transformation sequence from beginWord to endWord.",
    explanation: "Use BFS to find the shortest path in word graph."
  }
];

export default problems;