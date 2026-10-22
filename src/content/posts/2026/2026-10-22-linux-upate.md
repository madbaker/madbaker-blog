---
title: "A Long Overdue Linux Update"
date: 2026-10-22
permalink: "/blog/linux-update/"
tags: ["Tech","linux", "writing"]
---
It's been [just over a year](../2025/2025-10-02-linux.md) since I dipped a toe into running Linux every day and I finally took the plunge.  

I'm writing this update on my main laptop, a Dell XPS-7590 that I bought in 2019.  I love this machine but it was getting slower and slower with all the Windows overhead.  Now I'm running [Linux Mint](https://linuxmint.com/download.php) and the machine has a new lease on life.  Bright and snappy.

## Dr. Frankenstein's Home Network

It's been a relatively smooth transition, complicated only because I make things complicated.  I'm trying to keep a 20 year digital footprint all in one place, but also with redundancy, so that means I have a few moving pieces:

- The Dell laptop that I'm using all the time
- a Raspberry Pi running Raspbian (Debian) with a 4Tb SSD attached, acting as a file server
- a 32" monitor that acts as a TV when I plug it into the laptop.
- USB speakers that plug into the laptop when we're watching "TV"
- two additional 4TB external drives for backups and backups-of-backups

That's the main loop.  But, as you might guess, there are other bits:

- Cindy's Microsoft Surface tablet is isolated from all this carnage but might need to access the file server someday.
- a 13 year old Acer laptop running Linux Mint Debian Edition, that I used for a year getting used to things.  It's intensely slow, so is now sitting on a shelf.  

Everything went together fairly easily.  Loading Mint on the Dell machine was straight forward, but I stumbled for a while getting the correct Nvidia drivers to work.  The machine was throwing a lot of errors and hanging up after about an hour.  It turns out that the current drivers assume there is a function on my old GPU that didn't exist in 2019. Finding an older version of the proprietary driver took a bit of work, but I've now been running for over a week with no issues.

## Backup Blunder

The biggest hiccup occured on the Raspberry Pi rather than the Dell.  My backup process is messy.  I should be able to plug my backup drive into the Pi and run rsync to perform the backup.  But two USB drives draw too much power for the little Pi to handle, so I have to plug the backup drive into the Dell and backup over the network.  

I thought I would get cute and unplug the main drive from the Pi and plug both into the Dell to get faster transfers.  But in the process of shutting down the Pi, I corrupted the Pi's SD card and had to reformat and reinstall the Pi operating system.  

(While I was doing the OS reinstall, I finished the backups without incident.)

Then the _real_ fun began.  Everything seemed to be working fine but no matter what, I could not connect to the Pi via SSH or mount the network drive on the Dell.  I could ping the Pi, VNC into the desktop no problem, but SSH would hand during authentication.  

I tried everything.  Rebuilt keys.  Installed and re-installed SSH, consulted so many AI-generated fixes that my brain was bursting.  

After two days of frustration, I got a clue from an AI response that there was experimental changes in the Pi version of Debian 'Trixie' that might be causing problems.  The lightbulb came on for me.  

When I reinstalled the Pi OS, it automatically upgraded from Debian "Bookworm" to "Trixie".  Rather than fix the new bugs, I reinstalled "Bookworm" and everything worked first try!

I've been running error free for two days now so I think it really works.  

## Configuration Tweaks

I haven't done too much in terms of config.  

- I have VNC (and the Tiger VNC Viewer) and SSH running so I can connect to the Pi.  
- I have firewalls running on both machines so they are locked down except for very specific access
- Nordvpn is installed and running fine
- I loaded Steam for games and my two Steam games work OK
- I'm fiddling between [Quod Libet](https://quodlibet.readthedocs.io/en/latest/index.html) and [Strawberry](https://www.strawberrymusicplayer.org/) for my music player
- I'm loving the pre-packaged [Celluloid video player](https://celluloid-player.github.io/) so far. 
- I installed VS-Codium for my writing (this 11ty blog) and  book-keeping (hledger)

## Full Linux Beats Faux Linux

The scariest bit was getting my blog reinstalled on the Dell. It's the first time I reinstalled the blog and the [Eleventy](https://www.11ty.dev/) static site generator on a new machine.

Previously, I developed the blog using Windows Subsystem for Linux (WSL).  It feels like you've bolted a tiny Linux system on the insides of Windows 11.  For an amateur like me, it was just strange enough that I was never fully comfortable using it.  So now I get to run everything in "real" Linux and it feels much, much better.

The install was still scary though. 

- I didn't really write any documentation on how to do this.  But this blog is based on an 11ty template, and those docs reminded me how to install the site. (I've since updated my docs!)
- It's been nearly a year since I did anything with this site and a LOT of 11ty dependencies have changed or been deprecated.  I got many warnings about how there were **severe vulnerabilities** and **breaking changes** and the like.  Jeepers.  

I installed the software, forced through the dependency upgrades, reminded myself how to start the server and gave it a go.

```npm run start```

It started up!  The inital build always takes around 10 minutes, so I waited patiently for a list of build errors I would need to fix.  But then, presto!  It just worked!

Now, if the production build goes this smooth I will be stunned, but I'm going cross my fingers and give it a go soon. (If you can read this, it worked!)

## My Wish List

At this point, the Pi is my bottleneck.  In a perfect world I'd replace it with a mini-pc where I could mount my file server SSD inside and it could power the backup drives, etc.  But refurbished mini-pcs with specs better than my 7 year old Dell laptop are still $300 or more, so I'll wait.  

I'd also like to shift from USB speakers to wireless Bluetooth speakers, so I can direct sound from the Pi "server" when needed or from my laptop.  Today I'm swapping the USB connector between machines.  

Oh, and a remote keyboard / remote control for my monitor "TV" would be fun.

But overall, things are working just as I'd like and I'm very happy with the result.  At least until I tinker some more and break everything again!