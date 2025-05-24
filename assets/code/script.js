const terminal = document.getElementById('terminal');
    const input = document.getElementById('input');
    const Cmd = document.getElementById('-cmd');
    const Output = document.getElementById('-output');
    const container = document.getElementById('containTheWebsite');

    const commands = {
      help: `available commands:\n- about\n- links\n- contact\n- writings\n- clear\n- keys\n- pronouns`,
      about: `hey, i'm auri; i code stuff and sometimes write`,
      links: `pronouns → <a href='https://en.pronouns.page/@layered' target='_blank'>en.pronouns.page/@layered</a>\nbluesky → <a href='https://bsky.app/profile/auri.lol' target='_blank'>bsky.app/profile/auri.lol</a>`,
      contact: `email me at <a href='mailto:me@auri.lol'>me@auri.lol</a>`,
      keys: `click to <a href='keys.txt' target='_blank'>view my publickeys</a>`,
      pronouns: `click to <a href='/assets/image/pronounspage.png' target='_blank'>view my pronouns page</a>`,
      writings: `click to <a href='https://writings.auri.lol' target='_blank'>view my writings</a>`
    };

    function showDefaultOutput() {
      Cmd.innerText = `auri@jupiter:~$ ./me.sh`;
      Output.innerHTML = '';
      const defaultLines = [
        '~ welcome to my corner of the internet',
        '~ i exist probably maybe'
      ];
      defaultLines.forEach((line, index) => {
        setTimeout(() => {
          const output = document.createElement('div');
          output.className = 'terminal-line';
          output.innerHTML = line;
          Output.appendChild(output);
        }, 75 * index);
      });
    }

    function typeLine(text, index = 0, callback) {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      Output.appendChild(line);
      let i = 0;
      const interval = setInterval(() => {
        line.innerHTML += text[i++];
        if (i >= text.length) {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 10);
    }

    function runcmd(cmd, fromSelect = false) {
      if (!cmd) return;
      const normalized = cmd.toLowerCase();
      if (normalized === 'clear' || normalized === 'cls') {
        showDefaultOutput();
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'ls') {
        runcmd('help');
        return;
      }
      if (normalized === 'home') {
        showDefaultOutput();
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'rm -rf /') { // no way
        container.style.opacity = '0';
        setTimeout(() => {
          document.body.style.background = '#000';
          document.body.innerHTML = '';
        }, 1000);
        return;
      }
      if (normalized === 'sudo') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '<div class="terminal-line">you arent in the sudoers file probably i think...</div>';
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'cat /dev/random') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '';
        let chars = 'qwertyuiopASDFGHJklZxCvBnm';
        let interval = setInterval(() => {
          let line = '';
          for (let i = 0; i < 64; i++) line += chars[Math.floor(Math.random() * chars.length)];
          const output = document.createElement('div');
          output.className = 'terminal-line';
          output.innerHTML = line;
          Output.appendChild(output);
          Output.scrollTop = Output.scrollHeight;
        }, 30);
        setTimeout(() => { clearInterval(interval); Output.innerHTML += '<div class="terminal-line">:3</div>'; }, 800);
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'sl') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '<div class="terminal-line">you may have typed that wrong... oops</div>';
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'catsay') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '<div class="terminal-line">its cowsay, silly :3</div>';
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'cowsay') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '<div class="terminal-line">its catsay, moo</div>';
        if (fromSelect) input.value = '';
        return;
      }
      if (normalized === 'ls -la') {
        Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
        Output.innerHTML = '';
        const allCommands = [
          'about', 'links', 'contact', 'writings', 'clear', 'keys', 'pronouns',
          'ls', 'ls -la', 'home', 'rm -rf /', 'sudo', 'cat /dev/random', 'sl', 'catsay', 'cowsay'
        ];
        allCommands.forEach((c, i) => {
          setTimeout(() => {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = c;
            Output.appendChild(output);
          }, 40 * i);
        });
        if (fromSelect) input.value = '';
        return;
      }
      Cmd.innerText = `auri@jupiter:~$ ${cmd}`;
      Output.innerHTML = '';
      if (normalized === 'about') {
        typeLine(commands.about);
      } else {
        const lines = (commands[normalized] || `cmd doesn't exist: ${cmd}`).split('\n');
        lines.forEach((line, index) => {
          setTimeout(() => {
            const output = document.createElement('div');
            output.className = 'terminal-line';
            output.innerHTML = line;
            Output.appendChild(output);
          }, 75 * index);
        });
      }
      if (fromSelect) input.value = '';
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        runcmd(input.value.trim());
        input.value = '';
      }
    });

    showDefaultOutput();

console.log('auri.lol :3 // github.com/imlayered/website')

// what in the spaghetti

    function addRandomHearts() {
      document.querySelectorAll('.random-heart').forEach(e => e.remove());
      const heartImages = [
        '/assets/random/heart.png',
        '/assets/random/heart2.png',
        '/assets/random/colonthree.png',
        '/assets/random/aaa.png',
        '/assets/random/cat.png',
        '/assets/random/owo.png'

      ];
      const count = Math.floor(Math.random() * 41) + 10;
      const container = document.getElementById('containTheWebsite');
      const containerRect = container ? container.getBoundingClientRect() : null;
      const maxTries = 20;
      for (let i = 0; i < count; i++) {
        let img, tries = 0, overlap = true;
        let width = Math.random() * 60 + 40;
        let height = width; 
        let top, left;
        while (overlap && tries < maxTries) {
          top = Math.random() * (window.innerHeight - height);
          left = Math.random() * (window.innerWidth - width);
          overlap = false;
          if (containerRect) {
            const heartRect = {
              top: top,
              left: left,
              right: left + width,
              bottom: top + height
            };
            if (!(heartRect.right < containerRect.left ||
                  heartRect.left > containerRect.right ||
                  heartRect.bottom < containerRect.top ||
                  heartRect.top > containerRect.bottom)) {
              overlap = true;
            }
          }
          tries++;
        }
        img = document.createElement('img');
        img.src = heartImages[Math.floor(Math.random() * heartImages.length)];
        img.className = 'random-heart';
        img.alt = 'heart';
        img.style.position = 'fixed';
        img.style.zIndex = 1000;
        img.style.pointerEvents = 'none';
        img.style.width = width + 'px';
        img.style.height = height + 'px';
        img.style.top = top + 'px';
        img.style.left = left + 'px';
        img.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(img);
      }
    }

    addRandomHearts();