import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách quyền riêng tư - Techomies',
};

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-4 pb-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-lg">
        At Techomies, we take your privacy seriously. This Privacy Policy
        outlines the types of personal information we collect, how we use it,
        and how we safeguard your data. By using our website, you consent to the
        practices described in this policy.
      </p>
      <h2 className="text-2xl font-bold mt-4">
        Information Collection and Use
      </h2>
      <p className="text-lg mt-2">
        We may collect certain personally identifiable information when you
        interact with our website, such as your name, email address, and any
        other information you voluntarily provide through our contact forms or
        comment sections. We use this information solely to respond to your
        inquiries and to improve your experience on our site.
      </p>
      <h2 className="text-2xl font-bold mt-4">Log Data</h2>
      <p className="text-lg mt-2">
        Like many other websites, we collect information that your browser sends
        whenever you visit Techomies. This Log Data may include information such
        as your computers Internet Protocol (IP) address, browser type, browser
        version, the pages of our site that you visit, the time and date of your
        visit, the time spent on those pages, and other statistics. This
        information is used to analyze trends, administer the site, and gather
        demographic information for internal purposes.
      </p>
      <h2 className="text-2xl font-bold mt-4">
        Cookies and Similar Technologies
      </h2>
      <p className="text-lg mt-2">
        Techomies uses cookies and similar technologies to enhance your browsing
        experience. Cookies are small files stored on your computers hard drive
        by your web browser. They help us understand your preferences and tailor
        our content to better suit your needs. You can modify your browser
        settings to refuse cookies, but this may limit some functionality of our
        website.
      </p>
      <h2 className="text-2xl font-bold mt-4">Third-Party Services</h2>
      <p className="text-lg mt-2">
        We may use third-party services, such as Google Analytics, to analyze
        the usage of our website. These services may collect and track data on
        our behalf to understand how users interact with our site. However, they
        are bound by their own privacy policies and do not have permission to
        share this data with others.
      </p>
      <h2 className="text-2xl font-bold mt-4">Data Security</h2>
      <p className="text-lg mt-2">
        The security of your personal information is important to us. We
        implement reasonable security measures to protect against unauthorized
        access or disclosure of your data. However, no method of transmission
        over the internet or electronic storage is completely secure. While we
        strive to protect your personal information, we cannot guarantee its
        absolute security.
      </p>
      <h2 className="text-2xl font-bold mt-4">
        Changes to this Privacy Policy
      </h2>
      <p className="text-lg mt-2">
        Techomies reserves the right to update or modify this Privacy Policy at
        any time. Any changes will be posted on this page, and the date of the
        last update will be indicated at the top of the policy. We encourage you
        to review this page periodically to stay informed about how we handle
        your information.
      </p>
      <h2 className="text-2xl font-bold mt-4">Contact Us</h2>
      <p className="text-lg mt-2">
        If you have any questions or concerns about our Privacy Policy, please
        dont hesitate to contact us at privacy@Techomies.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
