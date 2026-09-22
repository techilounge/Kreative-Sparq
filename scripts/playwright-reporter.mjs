class PortableReporter {
  onBegin(_config, suite) {
    this.total = suite.allTests().length;
    this.completed = 0;
    this.failed = 0;
    this.startedAt = Date.now();
    process.stdout.write(`Running ${this.total} tests\n`);
  }

  onTestEnd(test, result) {
    this.completed += 1;
    if (!["passed", "skipped"].includes(result.status)) {
      this.failed += 1;
      process.stderr.write(
        `\nFAILED ${test.titlePath().join(" › ")}\n${result.error?.stack ?? result.error?.message ?? result.status}\n`,
      );
    } else {
      process.stdout.write(result.status === "passed" ? "." : "S");
    }

    if (this.completed === this.total) {
      const seconds = ((Date.now() - this.startedAt) / 1000).toFixed(1);
      process.stdout.write(
        `\n${this.total - this.failed} passed${this.failed ? `, ${this.failed} failed` : ""} (${seconds}s)\n`,
      );

      // Playwright 1.63 can leave its Chromium child handle open on Windows
      // after every result has completed. Give normal teardown five seconds,
      // then end the already-finished runner so the portable command returns.
      const teardownGuard = setTimeout(
        () => process.exit(this.failed === 0 ? 0 : 1),
        5000,
      );
      teardownGuard.unref();
    }
  }
}

export default PortableReporter;
