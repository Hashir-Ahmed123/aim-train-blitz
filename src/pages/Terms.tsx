const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                By accessing and using AimTrainer Pro, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Permission is granted to temporarily download one copy of AimTrainer Pro for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>Violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>Interfere with or circumvent the security features of the service</li>
                <li>Use any automated system to access the service in a manner that sends more request messages than a human can reasonably produce</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AimTrainer Pro is provided "as is" without any representations or warranties. 
                We make no guarantees regarding the availability, functionality, or performance of the service. 
                The service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The materials on AimTrainer Pro are provided on an 'as is' basis. AimTrainer Pro makes 
                no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including without limitation, implied warranties or conditions of merchantability, fitness 
                for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                In no event shall AimTrainer Pro or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on AimTrainer Pro, even if 
                AimTrainer Pro or an authorized representative has been notified orally or in writing 
                of the possibility of such damage.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Advertising Revenue</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AimTrainer Pro may display advertisements to support the free operation of the service. 
                By using the service, you acknowledge and agree that we may display advertisements 
                and that your use of the service constitutes acceptance of such advertising.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AimTrainer Pro may revise these terms of service at any time without notice. 
                By using this service, you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms of Service, please contact us 
                through our contact page or email us at legal@aimtrainerpro.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;