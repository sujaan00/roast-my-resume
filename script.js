document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const fileInfo = document.getElementById("fileInfo");
    const roastButton = document.getElementById("roastButton");
    const loadingContainer = document.getElementById("loadingContainer");
    const roastResults = document.getElementById("roastResults");
    const roastContent = document.getElementById("roastContent");
    const copyRoast = document.getElementById("copyRoast");
    const shareRoast = document.getElementById("shareRoast");
    const rateFireButton = document.getElementById("rateFireButton");
    const rateTrashButton = document.getElementById("rateTrashButton");
    const roastList = document.getElementById("roastList");
    const leaderboardList = document.getElementById("leaderboardList");
    const roastSubmissionForm = document.getElementById("roastSubmissionForm");
    const tabButtons = document.querySelectorAll(".tab-button");
  
    // Sample data for community roasts
    const communityRoasts = [
      {
        content:
          "This resume has more buzzwords than a beehive on steroids. 'Synergy'? 'Leverage'? Did you swallow a corporate dictionary?",
        author: "SavageRecruiter42",
        date: "2 days ago",
        likes: 128,
        comments: 14,
      },
      {
        content:
          "Your 'skills' section is like a Netflix subscription - lots of options but nothing worth watching.",
        author: "HRNightmare",
        date: "1 week ago",
        likes: 95,
        comments: 8,
      },
      {
        content:
          "I've seen more impressive qualifications on a cereal box. At least those have nutritional value.",
        author: "JobGuru",
        date: "3 days ago",
        likes: 76,
        comments: 5,
      },
      {
        content:
          "Your career objective reads like a dating profile - desperate and full of unrealistic expectations.",
        author: "ResumeRipper",
        date: "5 days ago",
        likes: 112,
        comments: 11,
      },
      {
        content:
          "If your job performance is anything like your formatting skills, I'm surprised you haven't been fired from Microsoft Word.",
        author: "FormatFury",
        date: "1 day ago",
        likes: 89,
        comments: 7,
      },
      {
        content:
          "Your employment gaps are bigger than the Grand Canyon. What were you doing, searching for your personality?",
        author: "HiringManager101",
        date: "4 days ago",
        likes: 65,
        comments: 9,
      },
    ];
  
    // Sample data for leaderboard
    const leaderboardRoasts = [
      {
        content:
          "This resume is so generic, it could apply for a job as 'Person Who Exists'.",
        score: 342,
      },
      {
        content:
          "Your resume is like a bad tinder profile - overselling mediocre qualities and hiding all the red flags.",
        score: 315,
      },
      {
        content:
          "I've seen more impressive skills listed on a kindergartner's refrigerator art.",
        score: 287,
      },
      {
        content: "Your job history is shorter than my patience for this resume.",
        score: 253,
      },
      {
        content:
          "Congratulations on creating a resume so boring it could be prescribed as a sleep aid.",
        score: 241,
      },
      {
        content:
          "Your 'References Available Upon Request' is the only honest statement in this entire document.",
        score: 219,
      },
      {
        content: "This resume has more padding than a sumo wrestler's mattress.",
        score: 198,
      },
      {
        content:
          "If your career was a movie, this resume would be the spoiler that nobody asked for.",
        score: 176,
      },
      {
        content:
          "Your resume is like a bad haircut - no matter how you style it, it's still embarrassing.",
        score: 154,
      },
      {
        content: "I've seen more coherent narratives in fortune cookies.",
        score: 132,
      },
    ];
  
    // Sample roasts for the generator
    const sampleRoasts = [
      "Your resume has more clichés than a motivational poster factory. 'Team player'? 'Detail-oriented'? Did you also put 'breathing' under skills?",
      "I've seen more impressive qualifications written on bathroom walls. At least those are entertaining.",
      "Your employment history is like a bad relationship - lots of commitment issues and questionable choices.",
      "This resume is so generic, I'm surprised it doesn't list 'existing' as an accomplishment.",
      "Your skills section is like my ex - claims to be proficient in many things but can't actually deliver on any of them.",
      "If your career trajectory was a roller coaster, it would be the kiddie one that barely leaves the ground.",
      "Your resume formatting is more inconsistent than game of thrones character development in the final season.",
      "I've seen more impressive achievements from my cat, and all he does is sleep and occasionally catch a moth.",
      "Your job descriptions read like you're trying to convince yourself you actually did something at these companies.",
      "This resume has more fluff than a marshmallow factory. Did you get paid by the adjective?",
      "Your 'professional summary' is longer than my commitment issues. Nobody's reading all that, champ.",
      "If this resume was a sandwich, it would be plain white bread with a single slice of processed cheese.",
      "Your career objective is so vague it could apply to literally any job including 'professional couch tester'.",
      "I've seen more coherent organization in my junk drawer. What exactly is the strategy here?",
      "Your listed accomplishments have more exaggeration than a fisherman's tale about 'the one that got away'.",
    ];
  
    // File upload handling
    uploadArea.addEventListener("click", () => {
      fileInput.click();
    });
  
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    });
  
    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover");
    });
  
    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
  
      if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length) {
        handleFile(fileInput.files[0]);
      }
    });
  
    function handleFile(file) {
      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document.");
        return;
      }
  
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
  
      // Display file info
      fileInfo.innerHTML = `
              <p><strong>${file.name}</strong> (${formatFileSize(file.size)})</p>
          `;
      fileInfo.classList.add("active");
  
      // Enable roast button
      roastButton.disabled = false;
    }
  
    function formatFileSize(bytes) {
      if (bytes < 1024) return bytes + " bytes";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
      else return (bytes / 1048576).toFixed(1) + " MB";
    }
  
    // Roast generation
    roastButton.addEventListener("click", () => {
      // Show loading
      loadingContainer.style.display = "flex";
      roastButton.disabled = true;
  
      // Simulate processing time
      setTimeout(() => {
        // Hide loading
        loadingContainer.style.display = "none";
  
        // Generate and display roast
        const roast = generateRoast();
        roastContent.innerHTML = formatRoast(roast);
        roastResults.style.display = "block";
  
        // Scroll to results
        roastResults.scrollIntoView({ behavior: "smooth" });
      }, 3000);
    });
  
    function generateRoast() {
      // In a real app, this would analyze the resume and generate custom roasts
      // For this demo, we'll use random pre-written roasts
      const roastCount = Math.floor(Math.random() * 3) + 3; // 3-5 roasts
      let roasts = [];
  
      // Get random roasts without repeating
      const availableRoasts = [...sampleRoasts];
      for (let i = 0; i < roastCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableRoasts.length);
        roasts.push(availableRoasts[randomIndex]);
        availableRoasts.splice(randomIndex, 1);
      }
  
      return roasts;
    }
  
    function formatRoast(roasts) {
      return roasts.map((roast) => `<p>${roast}</p>`).join("");
    }
  
    // Copy roast functionality
    copyRoast.addEventListener("click", () => {
      const textToCopy = roastContent.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // Change button text temporarily
          const originalText = copyRoast.innerHTML;
          copyRoast.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Copied!
                  `;
  
          setTimeout(() => {
            copyRoast.innerHTML = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });
  
    // Share roast functionality
    shareRoast.addEventListener("click", () => {
      // In a real app, this would open a share dialog or create a shareable link
      alert("Sharing functionality would be implemented here in a real app.");
    });
  
    // Rating functionality
    let fireCount = 0;
    let trashCount = 0;
  
    rateFireButton.addEventListener("click", () => {
      fireCount++;
      rateFireButton.querySelector(".count").textContent = fireCount;
      rateFireButton.disabled = true;
      rateTrashButton.disabled = true;
    });
  
    rateTrashButton.addEventListener("click", () => {
      trashCount++;
      rateTrashButton.querySelector(".count").textContent = trashCount;
      rateFireButton.disabled = true;
      rateTrashButton.disabled = true;
    });
  
    // Tab switching
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        tabButtons.forEach((btn) => btn.classList.remove("active"));
  
        // Add active class to clicked button
        button.classList.add("active");
  
        // Handle tab content switching
        const tabName = button.getAttribute("data-tab");
        if (tabName === "popular") {
          renderCommunityRoasts(
            [...communityRoasts].sort((a, b) => b.likes - a.likes),
          );
        } else {
          renderCommunityRoasts(communityRoasts);
        }
      });
    });
  
    // Render community roasts
    function renderCommunityRoasts(roasts) {
      roastList.innerHTML = "";
  
      roasts.forEach((roast) => {
        const roastCard = document.createElement("div");
        roastCard.className = "community-roast-card";
        roastCard.innerHTML = `
                  <div class="community-roast-content">${roast.content}</div>
                  <div class="community-roast-footer">
                      <span class="author">- ${roast.author}</span>
                      <div class="roast-stats">
                          <span class="stat">
                              <span class="emoji">🔥</span>
                              ${roast.likes}
                          </span>
                          <span class="stat">
                              <span class="emoji">💬</span>
                              ${roast.comments}
                          </span>
                      </div>
                  </div>
              `;
        roastList.appendChild(roastCard);
      });
    }
  
    // Render leaderboard
    function renderLeaderboard(roasts) {
      leaderboardList.innerHTML = "";
  
      roasts.forEach((roast, index) => {
        const rankClass = index < 3 ? `top-${index + 1}` : "";
  
        const leaderboardEntry = document.createElement("div");
        leaderboardEntry.className = "leaderboard-entry";
        leaderboardEntry.innerHTML = `
                  <div class="rank ${rankClass}">#${index + 1}</div>
                  <div class="leaderboard-roast">${roast.content}</div>
                  <div class="score">${roast.score}</div>
              `;
        leaderboardList.appendChild(leaderboardEntry);
      });
    }
  
    // Handle roast submission
    roastSubmissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const roastText = document.getElementById("roastText").value.trim();
      const authorName =
        document.getElementById("authorName").value.trim() || "Anonymous Roaster";
  
      if (roastText) {
        // In a real app, this would send the data to a server
        // For this demo, we'll just add it to our local array
        communityRoasts.unshift({
          content: roastText,
          author: authorName,
          date: "Just now",
          likes: 0,
          comments: 0,
        });
  
        // Re-render the community roasts
        renderCommunityRoasts(communityRoasts);
  
        // Reset the form
        roastSubmissionForm.reset();
  
        // Show confirmation
        alert("Your roast has been submitted!");
      } else {
        alert("Please enter a roast before submitting.");
      }
    });
  
    // Initialize the page
    renderCommunityRoasts(communityRoasts);
    renderLeaderboard(leaderboardRoasts);
  });
  