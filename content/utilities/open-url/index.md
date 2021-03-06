---
title: Utility to send a URL from iOS to Mac Browser
weight: 4
excerpt: Open URLs on your Mac from an iPhone
tags:
  - drafts
  - hazel
---
I often come across items of interest while on my iPhone or iPad that requires my Mac for the next step (like installing new Mac software or utilities that I read about while browsing Twitter on my phone) and I feel that a few other methods are too much work: OmniFocus task to check out the URL, bookmarking it, or even tossing it into a Read Later service. I just want the URL open on my Mac and the first thing I see when I sit down to it next. This little set of utilities does that simply.

[![Video Example](video-thumb.png)](https://www.dropbox.com/s/ltoxc0j11q9hx7e/Open-URL-on-Mac.mov)

## How it's used

- Copy a URL on iOS
- Paste into Drafts, then send to the "Open URL on Mac" action
- Your Mac's default browser open's the URL in a new tab

## Requirements

- [Drafts for iOS](http://agiletortoise.com/drafts) or Launch Center Pro
- [Hazel for Mac](http://www.noodlesoft.com/hazel.php)
- [Dropbox](http://www.dropbox.com/)

## How to install 

1. Install the Drafts action, by copying the Drafts Install URL below and pasting into Safari's URL bar while on iOS.
2. Run this in the Terminal: `mkdir -p ~/Dropbox/utilities/open-url/to-open-url`(we're just making a new directory for Hazel to watch)
3. Import the Hazel Rule, which can be [downloaded here](https://github.com/EvanLovely/drafts-hazel--open-url/raw/master/to-open-url.hazelrules).

### Drafts Install URL

	drafts://x-callback-url/import_action?type=dropbox&name=Open%20URL%20on%20laptop&path=%2FActions%2FOpen-URL%2F&filenametype=0&filename=&ext=txt&writetype=0&template=%5B%5Bdraft%5D%5D
        
*I tried just linking it, but GitHub strips out the `href` of the link, so I did this instead.*

### Bookmarklet for Safari ###

You can create a JavaScript bookmarklet that will automatically place the URL into Drafts and then run the action "Open on laptop"

To install as a bookmarklet use the following in a bookmark URL:

    javascript:window.location='drafts://x-callback-url/create?text='+encodeURIComponent(location.href)+'&action=Open%20URL%20on%20laptop'


### Launch Center Pro

* Install the [action from here](http://launchcenterpro.com/8rf2xv).

## What's happening under the hood

- Drafts creates a new text file containing just the URL and uploades it to the folder that Hazel is watching for any new file.
- When Hazel sees any new file, it runs a terminal command that opens the URL (so you could launch apps besides browsers), and then deletes the file. 


### Hazel Terminal Command

        open `cat "$1"`

The `$1` is Hazel's variable for the current actioning file. 
