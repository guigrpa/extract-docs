import childProcess from 'child_process';
import test from 'ava';

test.cb(t => {
  childProcess.execFile(
    '../extractDocs.js', 
    ['--template', 'template.md', '--stdout'],
    { cwd: __dirname }, 
    (err, stdout) => {
      t.ifError(err);
      t.same(stdout.trim().split('\n'), ['before', 'foo', 'after']);
      t.end();
    }
  );
});
