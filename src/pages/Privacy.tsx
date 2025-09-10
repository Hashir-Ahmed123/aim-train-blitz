const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AimTrainer Pro is committed to protecting your privacy. We collect minimal information to provide you with the best training experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Game statistics and performance data (stored locally on your device)</li>
                <li>Browser information for technical optimization</li>
                <li>Usage analytics to improve our platform</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>The information we collect is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide personalized training experiences</li>
                <li>Track your progress and improvement over time</li>
                <li>Optimize platform performance and user experience</li>
                <li>Analyze usage patterns to improve our services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your training data and game statistics are stored locally in your browser's storage. 
                This means your personal data never leaves your device unless you explicitly choose to share it.
              </p>
              <p>
                We use cookies and local storage to remember your preferences and settings for a better user experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may use third-party analytics services to understand how our platform is used. 
                These services may collect anonymous usage data to help us improve AimTrainer Pro.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clear your local data at any time through your browser settings</li>
                <li>Opt out of analytics tracking</li>
                <li>Request information about data we may have collected</li>
                <li>Contact us with any privacy concerns</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Advertising</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may display advertisements to support the free operation of AimTrainer Pro. 
                Our advertising partners may use cookies and similar technologies to provide relevant ads. 
                You can control ad personalization through your browser settings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this privacy policy from time to time. We will notify users of any 
                significant changes by posting the new privacy policy on this page and updating 
                the "Last updated" date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about this privacy policy or our data practices, 
                please contact us through our contact page or email us at privacy@aimtrainerpro.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;